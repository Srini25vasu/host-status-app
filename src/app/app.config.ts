import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
//import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { UserToken, Permissions } from './core/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserToken, useValue: { id: '123456', token: 'hdhsjsj' } },
    Permissions,
    //provideOAuthClient(),
  ]
};
