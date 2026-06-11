import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly httpClient = inject(HttpClient);

  //Pitfall #2 - avoid duplicate HTTP calls: use shareReplay()
  //https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
  //define the operators using pipe pattern. They will be executed when the observable is subscribed
  getCustomers(): Observable<Customer[]> {
    // Using relative URL - proxy will forward to http://localhost:8082
    return this.httpClient.get<Customer[]>('/services/api/customers').pipe(
      shareReplay()
    );
  }
}
