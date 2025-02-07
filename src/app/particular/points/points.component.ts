import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPointState } from '../../collector/store/point.selectors'; // Adjust path if needed
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  standalone: true,
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  connectedUser: any = {};
  totalPoints: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUser();
    if (!this.connectedUser) {
      this.router.navigate(['/login']);
    }

    // ✅ Load points from store
    this.store.select(selectPointState).subscribe((state) => {
      if (state) {
        console.log('State from Store:', state);
        this.totalPoints = Object.values(state.pointsByRequestId)
          .map((points) => Number(points)) // ✅ Ensure points are numbers
          .reduce((acc: number, points: number) => acc + points, 0);
      } else {
        // ✅ If store is empty, try loading from LocalStorage
        const storedState = localStorage.getItem('pointsState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.totalPoints = Object.values(parsedState.pointsByRequestId)
            .map((points) => Number(points)) // ✅ Ensure points are numbers
            .reduce((acc: number, points: number) => acc + points, 0);
        }
      }

      console.log('Total Points:', this.totalPoints);
    });
  }
}
