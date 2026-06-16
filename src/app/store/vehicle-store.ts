import { BehaviorSubject, Observable, tap } from "rxjs";
import { Vehicle } from "../models/vehicle.model";
import { inject, Injectable } from "@angular/core";
import { VehicleService } from "../services/vehicle.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleStore {
  private readonly vehicleService = inject(VehicleService);
  private readonly _vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  public readonly vehicles$ = this._vehicles.asObservable();

  loadAll(forceRefresh = true): Observable<Vehicle[]> {
    return this.vehicleService.getVehicles(forceRefresh).pipe(
      tap((vehicles: Vehicle[]) => this._vehicles.next(vehicles))
    );
  }

  create(vehicle: Omit<Vehicle, 'id'>): void {
    this.vehicleService.create(vehicle).pipe(
      tap((createdVehicle: Vehicle) => this._vehicles.next([...this._vehicles.getValue(), createdVehicle]))
    );
  }


  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.vehicleService.updateVehicle(vehicle).pipe(
      tap((updatedVehicle: Vehicle) => {
        const currentVehicles = this._vehicles.getValue();
        const vehicleIndex = currentVehicles.findIndex((item: Vehicle) => item.id === updatedVehicle.id);

        if (vehicleIndex === -1) {
          this._vehicles.next([...currentVehicles, updatedVehicle]);
          return;
        }

        const nextVehicles = [...currentVehicles];
        nextVehicles[vehicleIndex] = updatedVehicle;
        this._vehicles.next(nextVehicles);
      })
    );
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.vehicleService.deleteVehicle(id).pipe(
      tap(() => {
        const currentVehicles = this._vehicles.getValue();
        this._vehicles.next(currentVehicles.filter((vehicle: Vehicle) => vehicle.id !== id));
      })
    );
  }

  findById(id: number): Observable<Vehicle> {
    return this.vehicleService.findById(id);
  }

  searchVehicles(query: string): Observable<Vehicle[]> {
    return this.vehicleService.searchVehicles(query);
  }
}
