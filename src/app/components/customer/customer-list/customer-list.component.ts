import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CardComponent } from '../../../shared/components/ui/card/card.component';

// Example: https://www.codemag.com/Article/2511041/Angular-Signals-in-the-Real-World-Smarter-Inputs-and-Reactive-Routing
@Component({
  selector: 'app-customer-list',
  imports: [CardComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  // Signal-based input (works great with OnPush)
  customers = input<Customer[]>([]);

  protected onEdit(customer: Customer) {
    console.log('Edit customer:', customer);
  }

}
