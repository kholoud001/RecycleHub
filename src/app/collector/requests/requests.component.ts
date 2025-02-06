import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  connectedUser: any = null;
  filteredRequests: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }

  ngOnInit() {
    if (this.connectedUser) {
      const collectionRequests = JSON.parse(localStorage.getItem('collectionRequests') || '[]');

      const userCity = this.getCityFromAddress(this.connectedUser.adresse);

      this.filteredRequests = collectionRequests.filter((request: { adresse: string; }) => {
        const requestCity = this.getCityFromAddress(request.adresse);
        console.log(requestCity)
        return requestCity.includes(userCity);
      });
    }
  }

  getCityFromAddress(address: string): string {
    const parts = address.split(',');
    return parts[parts.length - 1].trim().toLowerCase();
  }


  updateRequest(request: any) {

  }

}
