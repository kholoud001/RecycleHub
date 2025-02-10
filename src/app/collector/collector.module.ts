import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorDashboardComponent } from './collector-dashboard/collector-dashboard.component';
import {FormsModule} from "@angular/forms";
import { RequestsComponent } from './requests/requests.component';
import { PointSystemComponent } from './point-system/point-system.component';
import { ConvertComponent } from './convert/convert.component';
import {StoreModule} from '@ngrx/store';
import {pointReducer} from './store/point.reducer';
import {RouterOutlet} from '@angular/router';
import {CollectorRoutingModule} from './collector-routing.module';


@NgModule({
  declarations: [
    CollectorDashboardComponent,
    PointSystemComponent,
    ConvertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RequestsComponent,
    CollectorRoutingModule,
    StoreModule.forFeature('points', pointReducer),
  ]
})
export class CollectorModule { }
