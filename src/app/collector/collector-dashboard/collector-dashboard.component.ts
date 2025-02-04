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

  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setPage(page: string) {
    this.currentPage = page;
  }

}
