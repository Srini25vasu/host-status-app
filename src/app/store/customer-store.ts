import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, of } from "rxjs";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer";

// Global cache that survives service recreation
const GLOBAL_CACHE = {
  customers: [] as Customer[],
  loading: false,
  loadingPromise: null as Observable<Customer[]> | null
};

@Injectable({
  providedIn: 'root'
})
export class CustomerStore {
  private _customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>(GLOBAL_CACHE.customers);
  private _instanceId = Math.random().toString(36).substr(2, 9);

  public readonly customers$ = this._customers.asObservable();

  constructor(private customerService: CustomerService) {
    console.log(`CustomerStore constructor called - Instance ID: ${this._instanceId}`);
    console.log(`Global cache has ${GLOBAL_CACHE.customers.length} customers`);

    // If global cache has data, emit it immediately
    if (GLOBAL_CACHE.customers.length > 0) {
      this._customers.next(GLOBAL_CACHE.customers);
    }
  }

  loadAll(): Observable<Customer[]> {
    console.log(`loadAll called - Instance ID: ${this._instanceId}`);
    console.log('Global cache customers length:', GLOBAL_CACHE.customers.length);
    console.log('Global cache loading:', GLOBAL_CACHE.loading);

    // If data already exists in global cache, return it
    if (GLOBAL_CACHE.customers.length > 0) {
      console.log('data already loaded in global cache - returning cached data');
      return of(GLOBAL_CACHE.customers);
    }

    // If currently loading globally, return the loading promise
    if (GLOBAL_CACHE.loading && GLOBAL_CACHE.loadingPromise) {
      console.log('data is currently being loaded globally - returning loading promise');
      return GLOBAL_CACHE.loadingPromise;
    }

    console.log('loading customer data from service');
    GLOBAL_CACHE.loading = true;

    // Cache the observable globally to prevent multiple HTTP requests
    GLOBAL_CACHE.loadingPromise = this.customerService.getCustomers().pipe(
      shareReplay(1)
    );

    console.log('About to subscribe to HTTP request');
    GLOBAL_CACHE.loadingPromise.subscribe({
      next: (customers: Customer[]) => {
        console.log('HTTP request completed, customers loaded:', customers.length);
        console.log('Customers data:', customers);
        console.log('Before storing, Global cache length:', GLOBAL_CACHE.customers.length);

        // Store in global cache
        GLOBAL_CACHE.customers = [...customers];

        console.log('After storing, Global cache length:', GLOBAL_CACHE.customers.length);

        // Also emit to current instance's BehaviorSubject
        this._customers.next(GLOBAL_CACHE.customers);

        GLOBAL_CACHE.loading = false;
        GLOBAL_CACHE.loadingPromise = null;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        GLOBAL_CACHE.loading = false;
        GLOBAL_CACHE.loadingPromise = null;
      }
    });

    return GLOBAL_CACHE.loadingPromise;
  }
}
