import { Component } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-point-system',
  standalone: false,

  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.css'
})
export class PointSystemComponent {

  connectedUser: any = null;
  vouchers = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];
  points: number = 0;
  collectedMaterials: any;


  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }


  validateCollection() {

  }
}
