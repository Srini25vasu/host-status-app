import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  //Pitfall #2 - avoid duplicate HTTP calls: use shareReplay()
  //https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
  getCustomers(): Observable<any> {
    // Using relative URL - proxy will forward to http://localhost:8082
    return this.httpClient.get('/api/customers').pipe(
      shareReplay()
    );
  }
}
