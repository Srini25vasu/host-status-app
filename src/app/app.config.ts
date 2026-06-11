import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
//import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { UserToken, Permissions } from './core/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Collapses multiple events/microtasks into fewer change detection cycles.
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true
    }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserToken, useValue: { id: '123456', token: 'hdhsjsj' } },
    Permissions
  ]
};
