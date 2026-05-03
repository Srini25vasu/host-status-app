import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

//https://medium.com/@binurajtech/how-to-implement-oauth-in-angular-a-step-by-step-guide-0173c40ec0af
// install npm install angular-oauth2-oidc
@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  oauthService: OAuthService = inject(OAuthService);
  
  constructor() {
    this.initializeOAuth();
  }

  private async initializeOAuth() {
    try {
      this.oauthService.configure(authConfig);
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
      console.log('OAuth2 Service initialized successfully');
    } catch (error) {
      console.error('OAuth2 initialization failed:', error);
    }
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isAuthenticated(): boolean {
    const hasValidToken = this.oauthService.hasValidAccessToken();
    console.log('OAuth2 hasValidAccessToken:', hasValidToken);
    return hasValidToken;
  }

  getUserProfile() {
    return this.oauthService.loadUserProfile();
  }
}
