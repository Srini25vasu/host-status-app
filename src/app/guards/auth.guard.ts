import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { inject } from '@angular/core';
//import { Oauth2Service } from '../core/auth/oauth2.service';

//https://angular.dev/api/router/CanActivate
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('AuthGuard executing for route:', route.url, state.url);
  const router: Router = inject(Router);
  //const oauth2Service: Oauth2Service = inject(Oauth2Service);
  const authService: AuthService = inject(AuthService);

  try {
    // Use cached userId from AuthService instead of route params
    const currentUserId = authService.getCurrentUserId();
    const isAuthenticated = authService.isAuthenticated(currentUserId);
    console.log('AuthGuard using cached userId:', currentUserId, 'isAuthenticated:', isAuthenticated);

    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      // Navigate to login page if authentication fails
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url } // Preserve the intended destination
      });
      return false;
    }
    console.log('AuthGuard: Access granted');
    return true;
  } catch (error) {
    console.error('AuthGuard error:', error);
    router.navigate(['/login']);
    return false;
  }
};
