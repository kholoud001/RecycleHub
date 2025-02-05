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

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myRequests', component: CollectionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'points', component: PointsComponent },
  { path: 'collector-dashboard', component: CollectorDashboardComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'points-system', component: PointSystemComponent },
  { path: 'convert', component: ConvertComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
