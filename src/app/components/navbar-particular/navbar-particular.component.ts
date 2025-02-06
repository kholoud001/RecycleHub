import { Component } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-particular',
  standalone: false,

  templateUrl: './navbar-particular.component.html',
  styleUrl: './navbar-particular.component.css'
})
export class NavbarParticularComponent {
  isMenuOpen: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
