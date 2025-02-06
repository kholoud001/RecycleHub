import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './particular/dashboard/dashboard.component';

import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {CollectorDashboardComponent} from './collector/collector-dashboard/collector-dashboard.component';
import {CollectionComponent} from './particular/collection/collection.component';
import {ProfileComponent} from './particular/profile/profile.component';
import {PointsComponent} from './particular/points/points.component';
import {RequestsComponent} from './collector/requests/requests.component';
import {PointSystemComponent} from './collector/point-system/point-system.component';
import {ConvertComponent} from './collector/convert/convert.component';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'particular' }
  },
  { path: 'myRequests', component: CollectionComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'particular' } },
  { path: 'profile', component: ProfileComponent },
  { path: 'points', component: PointsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'particular' } },

  {
    path: 'collector-dashboard',
    component: CollectorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'collector' }
  },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'collector' } },
  { path: 'points-system', component: PointSystemComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'collector' } },
  { path: 'convert', component: ConvertComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'collector' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
