import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { TakeUntilLeakChildComponent } from './components/memory_leak/take-until-leak-child/take-until-leak-child.component';
import { HttpResourceComponent } from './components/signal/http-resource/http-resource.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'memory-leak', component: TakeUntilLeakChildComponent },
  { path: 'http-resource', component: HttpResourceComponent },
];
