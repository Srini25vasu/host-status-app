import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { inject } from '@angular/core';

//https://angular.dev/api/router/CanActivate
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(route, state);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isAuthenticated = authService.isAuthenticated(route.params['id']);

  if (!isAuthenticated) {
    // Navigate to login page if authentication fails
    router.navigate(['/login']);
    return false;
  }

  return true;
};
