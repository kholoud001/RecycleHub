import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  connectedUser: any;
  currentPage: string = 'myRequests';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUser();
    if (!this.connectedUser) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showMyRequests(): void {
    this.currentPage = 'myRequests';
  }

  showProfile(): void {
    this.currentPage = 'profile';
  }

}
