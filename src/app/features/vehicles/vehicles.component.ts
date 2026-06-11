import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { VehicleStore } from '../../store/vehicle-store';
import { Vehicle } from '../../models/vehicle.model';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  searchControl = new FormControl('');
  private readonly vehicleStore = inject(VehicleStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  vehicles$ = this.vehicleStore.vehicles$;
  Vehicles: Vehicle[] = [];

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map((query) => (query ?? '').trim()),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query) {
          return this.vehicleStore.loadAll(false);
        }

        return this.vehicleStore.searchVehicles(query);
      }),
      catchError((error) => {
        console.error('Error while searching vehicles:', error);
        return of([] as Vehicle[]);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((vehicles: Vehicle[]) => {
      this.Vehicles = vehicles;
    });

    this.vehicleStore.loadAll().subscribe({
      next: (vehicles: Vehicle[]) => {
        this.Vehicles = vehicles;
      },
      error: (error) => {
        console.error('Component error loading vehicles:', error);
      },
      complete: () => {
        console.log('Component completed loading vehicles');
      }
    }
    );
  }

  onEdit(vehicle: Vehicle) {
    this.router.navigateByUrl(`/vehicles/edit/${vehicle.id}`, {
      state: {
        vehicle: vehicle
      }
    });
  }
}
