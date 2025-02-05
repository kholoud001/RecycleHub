import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorDashboardComponent } from './collector-dashboard/collector-dashboard.component';
import {FormsModule} from "@angular/forms";
import { RequestsComponent } from './requests/requests.component';
import { PointSystemComponent } from './point-system/point-system.component';
import { ConvertComponent } from './convert/convert.component';



@NgModule({
  declarations: [
    CollectorDashboardComponent,
    RequestsComponent,
    PointSystemComponent,
    ConvertComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class CollectorModule { }
