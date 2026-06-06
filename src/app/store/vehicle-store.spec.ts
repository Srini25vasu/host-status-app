import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VehicleStore } from './vehicle-store';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

describe('VehicleStore', () => {
  let store: VehicleStore;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;

  const VEHICLE_1: Vehicle = {
    id: 1,
    userName: 'user1',
    licensePlate: 'AA-1111',
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    color: 'Blue',
    status: 'AVAILABLE',
    batteryLevel: 90,
    latitude: 10,
    longitude: 20
  };

  const VEHICLE_2: Vehicle = {
    id: 2,
    userName: 'user2',
    licensePlate: 'BB-2222',
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    color: 'Black',
    status: 'IN_USE',
    batteryLevel: 70,
    latitude: 30,
    longitude: 40
  };

  beforeEach(() => {
    vehicleServiceSpy = jasmine.createSpyObj<VehicleService>('VehicleService', ['getVehicles', 'updateVehicle', 'deleteVehicle']);
    vehicleServiceSpy.getVehicles.and.returnValue(of([VEHICLE_1]));

    TestBed.configureTestingModule({
      providers: [
        VehicleStore,
        { provide: VehicleService, useValue: vehicleServiceSpy }
      ]
    });

    store = TestBed.inject(VehicleStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should not load vehicles on store creation', () => {
    expect(vehicleServiceSpy.getVehicles).not.toHaveBeenCalled();
  });

  it('should sync vehicles state when loadAll is called', () => {
    let latest: Vehicle[] = [];
    store.vehicles$.subscribe(vehicles => {
      latest = vehicles;
    });

    expect(latest).toEqual([]);

    store.loadAll().subscribe();
    expect(vehicleServiceSpy.getVehicles).toHaveBeenCalledWith(true);

    expect(latest).toEqual([VEHICLE_1]);

    vehicleServiceSpy.getVehicles.and.returnValue(of([VEHICLE_2]));
    store.loadAll().subscribe();

    expect(latest).toEqual([VEHICLE_2]);
  });

  it('should allow loadAll without force refresh', () => {
    store.loadAll(false).subscribe();

    expect(vehicleServiceSpy.getVehicles).toHaveBeenCalledWith(false);
  });

  it('should replace existing vehicle in state on updateVehicle', () => {
    const updatedVehicle = { ...VEHICLE_1, color: 'Red' };
    vehicleServiceSpy.updateVehicle.and.returnValue(of(updatedVehicle));

    let latest: Vehicle[] = [];
    store.vehicles$.subscribe(vehicles => {
      latest = vehicles;
    });

    store.updateVehicle(updatedVehicle).subscribe();

    expect(latest).toEqual([updatedVehicle]);
  });

  it('should append vehicle when updated vehicle does not exist in state', () => {
    vehicleServiceSpy.updateVehicle.and.returnValue(of(VEHICLE_2));

    let latest: Vehicle[] = [];
    store.vehicles$.subscribe(vehicles => {
      latest = vehicles;
    });

    store.updateVehicle(VEHICLE_2).subscribe();

    expect(latest).toEqual([VEHICLE_2]);
  });

  it('should remove vehicle from state on deleteVehicle', () => {
    vehicleServiceSpy.getVehicles.and.returnValue(of([VEHICLE_1, VEHICLE_2]));
    vehicleServiceSpy.deleteVehicle.and.returnValue(of(VEHICLE_2));

    let latest: Vehicle[] = [];
    store.vehicles$.subscribe(vehicles => {
      latest = vehicles;
    });

    store.loadAll().subscribe();
    store.deleteVehicle(VEHICLE_2.id).subscribe();

    expect(latest).toEqual([VEHICLE_1]);
    expect(vehicleServiceSpy.deleteVehicle).toHaveBeenCalledWith(VEHICLE_2.id);
  });
});
