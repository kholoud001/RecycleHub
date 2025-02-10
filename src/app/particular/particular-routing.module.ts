import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { ProfileComponent } from './profile/profile.component';
import { PointsComponent } from './points/points.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myRequests', component: CollectionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'points', component: PointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticularRoutingModule { }
