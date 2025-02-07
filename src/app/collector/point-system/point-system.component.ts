import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-system',
  standalone: false,
  templateUrl: './point-system.component.html',
  styleUrl: './point-system.component.css'
})
export class PointSystemComponent {
  connectedUser: any = null;
  conversionRequests: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
    this.loadConversionRequests();
  }

  loadConversionRequests() {
    const storedRequests = localStorage.getItem('conversionRequests');
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      this.conversionRequests = Object.values(parsedRequests).flat();
    }
  }

  acceptRequest(request: any) {
    request.status = "accepted";

    // Update Local Storage
    const storedRequests = localStorage.getItem('conversionRequests');
    if (storedRequests) {
      let parsedRequests = JSON.parse(storedRequests);

      // Find the user key associated with this request
      for (const userId in parsedRequests) {
        const userRequests = parsedRequests[userId];
        const requestIndex = userRequests.findIndex((req: any) => req.id === request.id);
        if (requestIndex !== -1) {
          userRequests[requestIndex].status = "accepted";
          break;
        }
      }

      localStorage.setItem('conversionRequests', JSON.stringify(parsedRequests));
    }

    this.loadConversionRequests();
  }


}
