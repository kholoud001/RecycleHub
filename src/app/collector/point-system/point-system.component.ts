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
    request.status = "acceptée"; // Change the status of the accepted request

    // Step 1: Update the conversionRequests in localStorage
    const storedRequests = localStorage.getItem('conversionRequests');
    if (storedRequests) {
      let parsedRequests = JSON.parse(storedRequests);

      // Find the user who made this request
      for (const userId in parsedRequests) {
        const userRequests = parsedRequests[userId];
        const requestIndex = userRequests.findIndex((req: any) => req.id === request.id);
        if (requestIndex !== -1) {
          userRequests[requestIndex].status = "acceptée"; // Update the status
          break;
        }
      }

      // Save updated conversion requests to localStorage
      localStorage.setItem('conversionRequests', JSON.stringify(parsedRequests));

      // Step 2: Reset the points for the user who sent the request
      const storedState = localStorage.getItem('pointsState');
      console.log("state stored ", storedState); // Debugging: check the current state
      if (storedState) {
        const parsedState = JSON.parse(storedState);

        // Access the pointsByRequestIdAndUserId map
        const userPointsMap = parsedState.pointsByRequestIdAndUserId;

        // Step 2a: Find the request in the conversionRequests to identify the requestor's userId
        const userIdOfRequestor = Object.keys(parsedRequests).find(userId => {
          return parsedRequests[userId].some((req: any) => req.id === request.id);
        });

        if (userIdOfRequestor) {
          // Reset points for the user who sent the request
          for (const requestId in userPointsMap) {
            if (userPointsMap[requestId].hasOwnProperty(userIdOfRequestor)) {
              // Reset points for this user across all request IDs
              userPointsMap[requestId][userIdOfRequestor] = 0;
              console.log(`Points for user ${userIdOfRequestor} reset to 0 for request ID ${requestId}`); // Debugging log
            }
          }

          // Step 3: Save the updated pointsState back to localStorage
          localStorage.setItem('pointsState', JSON.stringify(parsedState));
        }
      }
    }

    // Step 4: Reload conversion requests to update the UI
    this.loadConversionRequests();
  }


}
