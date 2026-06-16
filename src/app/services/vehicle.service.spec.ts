/// <reference types="jasmine" />

import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { VehicleService } from './vehicle.service';
import { Vehicle } from '../models/vehicle.model';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;

  const VEHICLE: Vehicle = {
    id: 1,
    userName: 'user',
    licensePlate: 'AB-1234',
    make: 'Toyota',
    model: 'Corolla',
    year: 2024,
    color: 'Blue',
    status: 'AVAILABLE',
    batteryLevel: 80,
    latitude: 10,
    longitude: 20
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use a single HTTP call for concurrent getVehicles calls', fakeAsync(() => {
    const firstResult: Vehicle[][] = [];
    const secondResult: Vehicle[][] = [];
    const thirdResult: Vehicle[][] = [];
    const fourthResult: Vehicle[][] = [];

    const first$ = service.getVehicles();
    const second$ = service.getVehicles();
    const third$ = service.getVehicles();
    const fourth$ = service.getVehicles();

    first$.subscribe(value => firstResult.push(value));
    second$.subscribe(value => secondResult.push(value));
    third$.subscribe(value => thirdResult.push(value));
    fourth$.subscribe(value => fourthResult.push(value));

    const req = httpMock.expectOne('/api/v1/vehicles?make=Toyota&model=Corolla');
    expect(req.request.method).toBe('GET');
    req.flush([VEHICLE]);
    flushMicrotasks();

    expect(firstResult[0]).toEqual([VEHICLE]);
    expect(secondResult[0]).toEqual([VEHICLE]);
    expect(thirdResult[0]).toEqual([VEHICLE]);
    expect(fourthResult[0]).toEqual([VEHICLE]);
  }));

  it('should return cached vehicles without making a second GET call', fakeAsync(() => {
    const firstResult: Vehicle[][] = [];
    const secondResult: Vehicle[][] = [];

    service.getVehicles().subscribe(value => firstResult.push(value));
    const firstGetReq = httpMock.expectOne('/api/v1/vehicles?make=Toyota&model=Corolla');
    firstGetReq.flush([VEHICLE]);
    flushMicrotasks();

    service.getVehicles().subscribe(value => secondResult.push(value));
    flushMicrotasks();
    httpMock.expectNone('/api/v1/vehicles?make=Toyota&model=Corolla');

    expect(firstResult[0]).toEqual([VEHICLE]);
    expect(secondResult[0]).toEqual([VEHICLE]);
  }));

  it('should update cached vehicles after updateVehicle', fakeAsync(() => {
    let latestVehicles: Vehicle[] = [];

    service.getVehicles().subscribe();
    const firstGetReq = httpMock.expectOne('/api/v1/vehicles?make=Toyota&model=Corolla');
    firstGetReq.flush([VEHICLE]);
    flushMicrotasks();

    service.getVehicles().subscribe(value => {
      latestVehicles = value;
    });
    flushMicrotasks();

    service.updateVehicle({ ...VEHICLE, color: 'Red' }).subscribe();
    const updateReq = httpMock.expectOne('/api/v1/vehicles');
    expect(updateReq.request.method).toBe('PUT');
    updateReq.flush({ ...VEHICLE, color: 'Red' });

    service.getVehicles().subscribe(value => {
      latestVehicles = value;
    });
    flushMicrotasks();
    httpMock.expectNone('/api/v1/vehicles?make=Toyota&model=Corolla');

    expect(latestVehicles).toEqual([{ ...VEHICLE, color: 'Red' }]);
  }));

  it('should update cached vehicles after deleteVehicle', fakeAsync(() => {
    const vehicle2 = { ...VEHICLE, id: 2, userName: 'other-user' };
    let latestVehicles: Vehicle[] = [];

    service.getVehicles().subscribe();
    const firstGetReq = httpMock.expectOne('/api/v1/vehicles?make=Toyota&model=Corolla');
    firstGetReq.flush([VEHICLE, vehicle2]);
    flushMicrotasks();

    service.deleteVehicle(vehicle2.id).subscribe();
    const deleteReq = httpMock.expectOne('/api/v1/vehicles/2');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(vehicle2);

    service.getVehicles().subscribe(value => {
      latestVehicles = value;
    });
    flushMicrotasks();
    httpMock.expectNone('/api/v1/vehicles?make=Toyota&model=Corolla');

    expect(latestVehicles).toEqual([VEHICLE]);
  }));
});
