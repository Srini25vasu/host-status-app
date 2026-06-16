import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerStore } from '../../store/customer-store';
import { Customer } from '../../models/customer';
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { ToasterComponent } from "../../shared/components/ui/toaster/toaster.component";
@Component({
  selector: 'app-customer',
  imports: [CommonModule,  RouterOutlet, CustomerListComponent, ToasterComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  toastVisible = true;
  toastTitle = 'Customers';
  toastMessage = '';
  toastTimestamp = 'now';

  private readonly customerStore = inject(CustomerStore);

  isLoading = true;
  customers: Customer[] = [];

  ngOnInit(): void {
    console.log('CustomerComponent ngOnInit called');
    this.isLoading = true;

    // Load data through the store
    this.customerStore.loadAll().subscribe({
      next: (customers) => {
        console.log('Component received customers:', customers.length);
        this.customers = customers;
        this.isLoading = false;
        this.showToast(`Loaded ${customers.length} customers successfully`);
      },
      error: (error) => {
        console.error('Component error loading customers:', error);
        this.isLoading = false;
      }
    });
  }

  //https://angular.dev/guide/routing/navigate-to-routes
  protected onEdit(customer: Customer) {
    console.log('Edit customer:', customer);
  }

  onToastClosed(): void {
    this.toastVisible = false;
  }

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastTimestamp = new Date().toLocaleTimeString();
    this.toastVisible = false;

    // Toggle visibility so repeated messages retrigger CSS transition and autohide timer.
    queueMicrotask(() => {
      this.toastVisible = true;
    });
  }

}
