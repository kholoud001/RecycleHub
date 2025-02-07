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
    request.status = "acceptée";

    const storedRequests = localStorage.getItem('conversionRequests');
    if (storedRequests) {
      let parsedRequests = JSON.parse(storedRequests);

      for (const userId in parsedRequests) {
        const userRequests = parsedRequests[userId];
        const requestIndex = userRequests.findIndex((req: any) => req.id === request.id);
        if (requestIndex !== -1) {
          // userRequests[requestIndex].status = "acceptée";
          break;
        }
      }

      localStorage.setItem('conversionRequests', JSON.stringify(parsedRequests));

      const storedState = localStorage.getItem('pointsState');
      // console.log("state stored ", storedState);
      if (storedState) {
        const parsedState = JSON.parse(storedState);

        const userPointsMap = parsedState.pointsByRequestIdAndUserId;

        const userIdOfRequestor = Object.keys(parsedRequests).find(userId => {
          return parsedRequests[userId].some((req: any) => req.id === request.id);
        });

        if (userIdOfRequestor) {
          for (const requestId in userPointsMap) {
            if (userPointsMap[requestId].hasOwnProperty(userIdOfRequestor)) {
              userPointsMap[requestId][userIdOfRequestor] = 0;
              // console.log(`Points for user ${userIdOfRequestor} reset to 0 for request ID ${requestId}`);
            }
          }

          localStorage.setItem('pointsState', JSON.stringify(parsedState));
        }
      }
    }

    this.loadConversionRequests();
  }


}
