import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorDashboardComponent } from './collector-dashboard/collector-dashboard.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CollectorDashboardComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class CollectorModule { }
