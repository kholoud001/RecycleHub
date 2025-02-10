import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectorDashboardComponent } from './collector-dashboard/collector-dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { PointSystemComponent } from './point-system/point-system.component';
import { ConvertComponent } from './convert/convert.component';

const routes: Routes = [
  { path: 'collector-dashboard', component: CollectorDashboardComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'points-system', component: PointSystemComponent },
  { path: 'convert', component: ConvertComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectorRoutingModule { }
