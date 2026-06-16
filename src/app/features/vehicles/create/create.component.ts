import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from '../../../models/vehicle.model';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  readonly router = inject(Router);

  vehicleForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    licensePlate: new FormControl('', [Validators.required, Validators.minLength(2)]),
    make: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    color: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    batteryLevel: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    latitude: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]),
    longitude: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)])
  });

  onCreate(): void {
    if (this.vehicleForm.invalid) {
      console.warn('Form is invalid', this.vehicleForm.errors);
      return;
    }

    const formValue = this.vehicleForm.getRawValue();
    const vehicleData: Omit<Vehicle, 'id'> = {
      userName: formValue.userName || '',
      licensePlate: formValue.licensePlate || '',
      make: formValue.make || '',
      model: formValue.model || '',
      year: Number.parseInt(formValue.year || '0', 10),
      color: formValue.color || '',
      status: formValue.status as Vehicle['status'],
      batteryLevel: Number.parseInt(formValue.batteryLevel || '0', 10),
      latitude: Number.parseFloat(formValue.latitude || '0'),
      longitude: Number.parseFloat(formValue.longitude || '0')
    };
    console.log('Creating vehicle:', vehicleData);
    // Integrate with VehicleService to save vehicle data before navigation
    this.router.navigateByUrl('/vehicles');
  }

  getErrorMessage(controlName: string): string {
    const control = this.vehicleForm.get(controlName);
    if (!control?.errors || !control?.touched) return '';

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['pattern']) return 'Invalid format';
    if (control.errors['min']) return `Must be at least ${control.errors['min'].min}`;
    if (control.errors['max']) return `Must not exceed ${control.errors['max'].max}`;
    return 'Invalid input';
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.vehicleForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
