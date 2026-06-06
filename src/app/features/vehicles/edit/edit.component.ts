import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Vehicle } from '../../../models/vehicle.model';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleStore } from '../../../store/vehicle-store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [CardComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vehicleStore = inject(VehicleStore);
  private readonly destroyRef = inject(DestroyRef);

  vehicle: Vehicle | undefined;
  isLoading = true;
  errorMessage = '';

  vehicleId = 0;

  ngOnInit(): void {
    const navigationStateVehicle = this.router.getCurrentNavigation()?.extras?.state?.['vehicle'] as Vehicle | undefined;
    const historyStateVehicle = history.state?.vehicle as Vehicle | undefined;

    // Pre-fill from navigation state for instant render, then verify/fallback by route id.
    this.vehicle = navigationStateVehicle ?? historyStateVehicle;

    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      tap((id: number) => {
        this.vehicleId = id;
        this.errorMessage = '';
      }),
      switchMap((id: number) => {
        if (!Number.isFinite(id) || id <= 0) {
          this.isLoading = false;
          this.errorMessage = 'Invalid vehicle id.';
          this.vehicle = undefined;
          return of(undefined);
        }

        if (this.vehicle?.id === id) {
          this.isLoading = false;
          return of(this.vehicle);
        }

        this.isLoading = true;
        return this.vehicleStore.findById(id).pipe(
          catchError(() => {
            this.errorMessage = 'Unable to load vehicle details.';
            this.vehicle = undefined;
            this.isLoading = false;
            return of(undefined);
          })
        );
      }),
      filter((vehicle): vehicle is Vehicle => !!vehicle),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((vehicle: Vehicle) => {
      this.vehicle = vehicle;
      this.isLoading = false;
    });
  }
}
