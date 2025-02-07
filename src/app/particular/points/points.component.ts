import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPointState } from '../../collector/store/point.selectors';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  connectedUser: any = {};
  totalPoints: number = 0;
  vouchers = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];
  conversionRequests: any = {};

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

    this.store.select(selectPointState).subscribe((state) => {
      if (state) {
        this.totalPoints = Object.values(state.pointsByRequestId)
          .map(points => Number(points))
          .reduce((acc: number, points: number) => acc + points, 0);
      } else {
        const storedState = localStorage.getItem('pointsState');
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          this.totalPoints = Object.values(parsedState.pointsByRequestId)
            .map(points => Number(points))
            .reduce((acc: number, points: number) => acc + points, 0);
        }
      }
    });

    this.loadConversionRequests();
  }

  loadConversionRequests() {
    const storedRequests = localStorage.getItem('conversionRequests');
    if (storedRequests) {
      this.conversionRequests = JSON.parse(storedRequests);
    }
  }

  requestConversion(points: number) {
    if (!this.conversionRequests[this.connectedUser.id]) {
      this.conversionRequests[this.connectedUser.id] = [];
    }

    const newRequest = { id: Date.now(), points, status: 'pending' };
    this.conversionRequests[this.connectedUser.id].push(newRequest);

    localStorage.setItem('conversionRequests', JSON.stringify(this.conversionRequests));
  }

  cancelConversion(points: number) {
    if (this.conversionRequests[this.connectedUser.id]) {
      this.conversionRequests[this.connectedUser.id] = this.conversionRequests[this.connectedUser.id]
        .filter((request: any) => request.points !== points);

      localStorage.setItem('conversionRequests', JSON.stringify(this.conversionRequests));
    }
  }

  hasPendingRequest(points: number): boolean {
    if (!this.conversionRequests[this.connectedUser.id]) return false;
    return this.conversionRequests[this.connectedUser.id]
      .some((request: any) => request.points === points && request.status === 'pending');
  }
}
