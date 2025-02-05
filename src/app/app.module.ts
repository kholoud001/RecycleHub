import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ParticularModule } from './particular/particular.module';
import { CollectorModule } from './collector/collector.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarParticularComponent } from './components/navbar-particular/navbar-particular.component';
import { NavbarCollectorComponent } from './components/navbar-collector/navbar-collector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarParticularComponent,
    NavbarCollectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ParticularModule,
    CollectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
