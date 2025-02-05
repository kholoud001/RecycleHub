import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit {
  userRole: string = '';

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('connectedUser') || '{}');
    this.userRole = user.role;
    // console.log("user role ", user.role);
  }
}

