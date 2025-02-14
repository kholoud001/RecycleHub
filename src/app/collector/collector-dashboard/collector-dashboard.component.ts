import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-collector-dashboard',
  standalone: false,

  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent {

  connectedUser: any = null;
  currentPage: string = 'myRequests';
  vouchers = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];
  points: number = 0;


  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }



  convertPoints(points: number) {

  }





}
