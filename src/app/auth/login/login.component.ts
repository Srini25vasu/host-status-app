import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  loginForm: FormGroup;
  returnUrl = '/home';
  routeParams: any = {};
  queryParams: any = {};

  // Subscriptions for cleanup
  private paramsSubscription?: Subscription;
  private queryParamsSubscription?: Subscription;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    });

    // Extract route params in constructor (snapshot approach)
    this.routeParams = this.route.snapshot.params;
    this.queryParams = this.route.snapshot.queryParams;
    console.log('Constructor - Route params:', this.routeParams);
    console.log('Constructor - Query params:', this.queryParams);
  }

  ngOnInit() {
    // Check if user is already authenticated using cached userId
    if (this.authService.isCurrentUserAuthenticated()) {
      console.log('User already authenticated with cached ID:', this.authService.getCurrentUserId());
      this.router.navigate(['/home']);
      return;
    }

    // Subscribe to route params (observable approach)
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.routeParams = params;
      console.log('ngOnInit - Route params updated:', params);
    });

    // Subscribe to query params (observable approach)
    this.queryParamsSubscription = this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.returnUrl = queryParams['returnUrl'] || '/customers/123456';
      console.log('ngOnInit - Query params updated:', queryParams);
      console.log('ngOnInit - Return URL set to:', this.returnUrl);
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.queryParamsSubscription?.unsubscribe();
  }

  // OAuth2 login method
  loginWithOAuth2() {
    try {
      //this.oauth2Service.login();
    } catch (error) {
      console.error('OAuth2 login failed:', error);
    }
  }

  // Form-based login using cached userId approach
  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login attempt:', { username, password: '***' });

      // Update cached userId with the username from login form
     // this.authService.setCachedUserId(username);

      // Check authentication using the cached approach
      if (this.authService.isAuthenticated(username)) {
        console.log('Login successful with cached userId:', this.authService.getCurrentUserId());
        this.authService.setCachedUserId(username);
        this.router.navigate([this.returnUrl]);
      } else {
        console.log('Login failed - authentication check returned false for:', username);
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
