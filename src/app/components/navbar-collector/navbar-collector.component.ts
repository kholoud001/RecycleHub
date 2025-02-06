import { Component } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-collector',
  standalone: false,

  templateUrl: './navbar-collector.component.html',
  styleUrl: './navbar-collector.component.css'
})
export class NavbarCollectorComponent {
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
