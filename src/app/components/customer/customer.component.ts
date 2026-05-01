import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { CustomerStore } from '../../store/customer-store';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, CardComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
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
      },
      error: (error) => {
        console.error('Component error loading customers:', error);
        this.isLoading = false;
      }
    });
  }
}
