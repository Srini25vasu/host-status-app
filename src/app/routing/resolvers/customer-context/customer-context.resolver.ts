import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CustomerStore } from '../../../store/customer-store';
import { Customer } from '../../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerContextResolver implements Resolve<any> {
  private readonly customerStore = inject(CustomerStore);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[] | string> {
    void route;
    void state;
   // Use the store's loadAll method which now returns the appropriate observable
      return this.customerStore.loadAll().pipe(
        catchError(() => of("No data") )
      );
  }
}
