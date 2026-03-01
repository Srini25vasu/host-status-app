import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { CardComponent } from "../../shared/components/ui/card/card.component";
import { CustomerStore } from '../../store/customer-store';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, CardComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  isLoading: boolean = true;
  customers: Customer[] = [];
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private readonly customerStore: CustomerStore,
    private readonly route: ActivatedRoute

  ) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
