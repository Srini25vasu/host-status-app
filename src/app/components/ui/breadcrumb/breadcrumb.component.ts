import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BreadcrumbItem {
  active: boolean;
  class: string;
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumbs: BreadcrumbItem[] = [];

}
