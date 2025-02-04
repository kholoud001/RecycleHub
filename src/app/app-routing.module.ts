import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './particular/dashboard/dashboard.component';

import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {CollectorDashboardComponent} from './collector/collector-dashboard/collector-dashboard.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-requests', component: DashboardComponent },
  { path: 'profile', component: DashboardComponent },
  { path: 'collector-dashboard', component: CollectorDashboardComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
