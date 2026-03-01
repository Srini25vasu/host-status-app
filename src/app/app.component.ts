import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    const header = document.querySelector('status-element');
    console.log('Header element:', header);
    if (header) {
      header.addEventListener('navigationRequest', (event: any) => {
        const path = event.detail as string;
        this.router.navigateByUrl("/");
      });
    }
  }
}
