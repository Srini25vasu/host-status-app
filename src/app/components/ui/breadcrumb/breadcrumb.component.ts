import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];
  router = inject(Router);

  ngOnInit(): void {
    this.buildBreadcrumbs();
  }

  private buildBreadcrumbs(): void {
    const urlSegments = this.router.url.split('/').filter(Boolean);
    this.breadcrumbs = [];
    let url = '';

    urlSegments.forEach((segment, index) => {
      url += `/${segment}`;
      const isActive = index === urlSegments.length - 1;
      this.breadcrumbs.push({
        label: this.formatLabel(segment),
        url: isActive ? undefined : url,
        active: isActive,
        class: isActive ? 'breadcrumb-item active' : 'breadcrumb-item'
      });
    });
  }

  private formatLabel(segment: string): string {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
