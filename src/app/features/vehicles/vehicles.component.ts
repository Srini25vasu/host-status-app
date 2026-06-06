import { Component, inject, OnInit } from '@angular/core';
import { VehicleStore } from '../../store/vehicle-store';
import { Vehicle } from '../../models/vehicle.model';
import { CardComponent } from "../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-vehicles',
  imports: [CardComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  private readonly vehicleStore = inject(VehicleStore);

  vehicles$ = this.vehicleStore.vehicles$;
  Vehicles: Vehicle[] = [];

  ngOnInit(): void {
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
}
