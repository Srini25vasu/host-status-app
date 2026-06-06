import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, firstValueFrom, from, of, tap } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly url = '/api/v1/vehicles';
  private readonly vehiclesCache = signal<Vehicle[]>([]);
  private hasLoadedVehicles = false;
  private vehiclesLoadPromise: Promise<Vehicle[]> | null = null;

  getVehicles(forceRefresh = false): Observable<Vehicle[]> {
    if (!forceRefresh && this.hasLoadedVehicles) {
      return of(this.vehiclesCache());
    }

    if (this.vehiclesLoadPromise) {
      return from(this.vehiclesLoadPromise);
    }

    // Using relative URL - proxy will forward to http://localhost:8080
    this.vehiclesLoadPromise = firstValueFrom(this.httpClient.get<Vehicle[]>(this.url + '?make=Toyota&model=Corolla')).then(
      (vehicles: Vehicle[]) => {
        this.vehiclesCache.set(vehicles);
        this.hasLoadedVehicles = true;
        return vehicles;
      }
    );

    return from(this.vehiclesLoadPromise).pipe(
      finalize(() => {
        this.vehiclesLoadPromise = null;
      }),

    );
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.put<Vehicle>(this.url, vehicle).pipe(
      tap((updatedVehicle: Vehicle) => {
        if (!this.hasLoadedVehicles) {
          return;
        }

        const currentVehicles = this.vehiclesCache();
        const vehicleIndex = currentVehicles.findIndex((item: Vehicle) => item.id === updatedVehicle.id);

        if (vehicleIndex === -1) {
          this.vehiclesCache.set([...currentVehicles, updatedVehicle]);
          return;
        }

        const nextVehicles = [...currentVehicles];
        nextVehicles[vehicleIndex] = updatedVehicle;
        this.vehiclesCache.set(nextVehicles);
      })
    );
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.httpClient.delete<Vehicle>(this.url + '/' + id).pipe(
      tap(() => {
        if (!this.hasLoadedVehicles) {
          return;
        }

        this.vehiclesCache.set(this.vehiclesCache().filter((vehicle: Vehicle) => vehicle.id !== id));
      })
    );
  }
}
