import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  private readonly router = inject(Router);

  ngAfterViewInit(): void {
    const header = document.querySelector('status-element');
    console.log('Header element:', header);
    if (header) {
      header.addEventListener('navigationRequest', (event: Event) => {
        const customEvent = event as CustomEvent<string>;
        const path = customEvent.detail;
        this.router.navigateByUrl(path || '/');
      });
    }
  }
}
