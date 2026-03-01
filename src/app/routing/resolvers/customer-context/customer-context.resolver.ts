import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CustomerStore } from '../../../store/customer-store';

@Injectable({
  providedIn: 'root'
})
export class CustomerContextResolver implements Resolve<any> {
  constructor(private customerStore: CustomerStore) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   // Use the store's loadAll method which now returns the appropriate observable
      return this.customerStore.loadAll().pipe(
        catchError(() => of("No data") )
      );
  }
}
