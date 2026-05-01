interface Booking {
  bookingId: number;
}

export interface CarBooking extends Booking {
  customerName: string;
  driverName: string;
  bookingDate: Date;
  bookingPrice: number;
  vehicleId: number;
}
