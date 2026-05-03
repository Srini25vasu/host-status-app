import { inject, Injectable } from '@angular/core';


export class UserToken {
  id = "123456";
  token = "hdhsjsj";
}

export class Permissions {
  canActivate(currentUser: UserToken, id: string): boolean {
    console.log(currentUser, id);
    if (id === currentUser.id)
      return true;
    else
      return false;
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUser: UserToken = inject(UserToken);
  private readonly permissions: Permissions = inject(Permissions);

  // Cache the current user ID for authentication checks
  private cachedUserId: string | undefined;

  constructor() {
    // Initialize cached user ID from current user
   // this.cachedUserId = this.currentUser.id;
  }

  // Get cached user ID
  getCurrentUserId(): string | undefined  {
    return this.cachedUserId;
  }

  // Set/update cached user ID
  setCachedUserId(userId: string): void {
    this.cachedUserId = userId;
    console.log('User ID cached:', userId);
  }

  // Check authentication using cached user ID
  isAuthenticated(id?: string): boolean {
    if(id !== undefined) {
    const userIdToCheck = id || this.getCurrentUserId();
    console.log('Authenticating with cached ID:', userIdToCheck);
    //this.setCachedUserId(id)
    return this.permissions.canActivate(this.currentUser, id);
    } else {
      return false;
    }
  }

  // Check if current user is authenticated (using cached ID)
  isCurrentUserAuthenticated(): boolean {
    return this.isAuthenticated(this.getCurrentUserId());
  }
}
