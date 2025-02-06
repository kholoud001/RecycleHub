import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: false,

  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

    constructor(private router: Router) {}

  goBack(): void {
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
    if (connectedUser) {
      if (connectedUser.role === 'particular') {
        this.router.navigate(['/dashboard']);
      } else if (connectedUser.role === 'collector') {
        this.router.navigate(['/collector-dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

}
