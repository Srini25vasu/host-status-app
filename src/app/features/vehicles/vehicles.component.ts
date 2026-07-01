import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleStore } from '../../store/vehicle-store';
import { Vehicle } from '../../models/vehicle.model';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ToasterComponent } from '../../shared/components/ui/toaster/toaster.component';
import { BreadcrumbComponent } from "../../components/ui/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, ToasterComponent, BreadcrumbComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  toastVisible = false;
  toastTitle = 'Vehicles';
  toastMessage = '';
  toastTimestamp = 'now';

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
        this.showToast('Vehicles loaded successfully');
      },
      error: (error) => {
        console.error('Component error loading vehicles:', error);
        this.showToast('Unable to load vehicles');
      },
      complete: () => {
        console.log('Component completed loading vehicles');
      }
    }
    );
  }

  onToastClosed(): void {
    this.toastVisible = false;
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    this.toastTimestamp = new Date().toLocaleTimeString();
    this.toastVisible = false;

    // Toggle visibility so repeated messages retrigger CSS transition and autohide timer.
    queueMicrotask(() => {
      this.toastVisible = true;
    });
  }

  onEdit(vehicle: Vehicle) {
    this.router.navigateByUrl(`/vehicles/edit/${vehicle.id}`, {
      state: {
        vehicle: vehicle
      }
    });
  }

  onCreate() {
    this.router.navigateByUrl('/vehicles/create');
  }
}
