import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ParticularModule } from './particular/particular.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarParticularComponent } from './components/navbar-particular/navbar-particular.component';
import { NavbarCollectorComponent } from './components/navbar-collector/navbar-collector.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {CollectorModule} from './collector/collector.module';
import {FormsModule} from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarParticularComponent,
    NavbarCollectorComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ParticularModule,
    CollectorModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    // StoreModule.forRoot({ requests: requestsReducer }),
    // EffectsModule.forRoot([RequestsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
