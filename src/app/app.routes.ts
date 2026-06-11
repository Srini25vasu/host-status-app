import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component';
import { TakeUntilLeakChildComponent } from './components/memory_leak/take-until-leak-child/take-until-leak-child.component';
import { HttpResourceComponent } from './components/signal/http-resource/http-resource.component';
import { LoginComponent } from './auth/login/login.component';
import { EditComponent } from './features/customers/edit/edit.component';
import { CreateComponent } from './features/customers/create/create.component';
import { DetailComponent } from './features/customers/detail/detail.component';
import { AuthGuard } from './guards/auth.guard';
import { DemoComponent } from './components/signal/demo/demo.component';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { EditComponent as VehicleEditComponent } from './features/vehicles/edit/edit.component';
import { CreateComponent as VehicleCreateComponent } from './features/vehicles/create/create.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerComponent,
    children: [
      {path: 'edit', component: EditComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'create', component: CreateComponent},
      {path: 'detail/:id', component: DetailComponent},
    ],
    //canActivate: [AuthGuard],
    //canActivateChild: [AuthGuard]
  },
  { path: 'customers/:id', component: DetailComponent,
    canActivate: [AuthGuard]
  },
  { path: 'memory-leak', component: TakeUntilLeakChildComponent },
  { path: 'http-resource', component: HttpResourceComponent },
  { path: 'signals', component: DemoComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/create', component: VehicleCreateComponent },
  { path: 'vehicles/edit/:id', component: VehicleEditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/home' }
];
