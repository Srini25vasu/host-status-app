import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { from, Observable, of, shareReplay } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = '/services/api/customers';
  private readonly customerCache = signal<Customer[]>([]);
  private hasLoadedCustomers = false;
  private customersLoadPromise: Promise<Customer[]> | null = null;


  //Pitfall #2 - avoid duplicate HTTP calls: use shareReplay()
  //https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
  //define the operators using pipe pattern. They will be executed when the observable is subscribed
  getCustomers(forceRefresh = false): Observable<Customer[]> {
    if(!forceRefresh && this.hasLoadedCustomers) {
      return of(this.customerCache());
    }

    if(this.customersLoadPromise) {
      return from (this.customersLoadPromise)
    }
    // Using relative URL - proxy will forward to http://localhost:8082
    return this.httpClient.get<Customer[]>(this.url).pipe(
      shareReplay()
    );
  }
}
