import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '172361028319-4cfkqnq5uad2asivb88r0hcgie0aio71.apps.googleusercontent.com', // Replace with your real Google OAuth2 client ID
  redirectUri: window.location.origin,
  scope: 'openid email profile',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true
}
