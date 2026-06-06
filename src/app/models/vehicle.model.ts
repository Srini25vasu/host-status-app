
export interface Vehicle {
  id: number;
  userName: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
  batteryLevel: number;
  latitude: number;
  longitude: number;
}

export type ReadonlyVehicle = Readonly<Vehicle>;
