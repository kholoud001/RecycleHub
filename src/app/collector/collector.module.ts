import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorDashboardComponent } from './collector-dashboard/collector-dashboard.component';
import {FormsModule} from "@angular/forms";
import { RequestsComponent } from './requests/requests.component';
import { PointSystemComponent } from './point-system/point-system.component';
import { ConvertComponent } from './convert/convert.component';
import {StoreModule} from '@ngrx/store';
import {pointSystemReducer} from './store/point-system.reducer';



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
    StoreModule.forFeature('pointSystem', pointSystemReducer)
  ]
})
export class CollectorModule { }
