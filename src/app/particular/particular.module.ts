import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CollectionComponent } from './collection/collection.component';
import { PointsComponent } from './points/points.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterOutlet} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {pointReducer} from '../collector/store/point.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    CollectionComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    StoreModule.forFeature('points', pointReducer)
  ]
})
export class ParticularModule { }
