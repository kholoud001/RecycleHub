import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadChildren: () => import('./particular/particular.module').then(m => m.ParticularModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'particular' }
  },

  {
    path: 'collector-dashboard',
    loadChildren: () => import('./collector/collector.module').then(m => m.CollectorModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'collector' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
