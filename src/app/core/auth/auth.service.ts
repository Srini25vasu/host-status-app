import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class UserToken {
  id = "1223";
  token = "hdhsjsj";
}

export class Permissions {
  canActivate(currentUser: UserToken, id: string): boolean {
    console.log(currentUser, id);
    return false;
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUser: UserToken = inject(UserToken);
  private readonly permissions: Permissions = inject(Permissions);
  isAuthenticated(id: string): boolean {
    console.log(this.currentUser, this.permissions, id);
    return this.permissions.canActivate(this.currentUser, id);
  }
}
