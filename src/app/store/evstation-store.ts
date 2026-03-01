import { Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class EvstationStore {

  constructor(private customerService: CustomerService) { }
}
