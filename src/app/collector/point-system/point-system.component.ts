import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {
  addPlastiquePoints,
  addVerrePoints,
  addPapierPoints,
  addMetalPoints,
  calculateTotalPoints
} from '../store/point-system.actions';
import { selectTotalPoints } from '../store/point-system.selectors';

@Component({
  selector: 'app-point-system',
  standalone: false,
  templateUrl: './point-system.component.html',
  styleUrls: ['./point-system.component.css']
})
export class PointSystemComponent {

  connectedUser: any = null;
  vouchers = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];
  points: number = 0;
  collectedMaterials: any = { plastique: 0, verre: 0, papier: 0, metal: 0 };

  constructor(private authService: AuthService, private router: Router, private store: Store) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }

  validateCollection() {
    if (this.collectedMaterials.plastique > 0) {
      this.store.dispatch(addPlastiquePoints({ kg: this.collectedMaterials.plastique }));
    }
    if (this.collectedMaterials.verre > 0) {
      this.store.dispatch(addVerrePoints({ kg: this.collectedMaterials.verre }));
    }
    if (this.collectedMaterials.papier > 0) {
      this.store.dispatch(addPapierPoints({ kg: this.collectedMaterials.papier }));
    }
    if (this.collectedMaterials.metal > 0) {
      this.store.dispatch(addMetalPoints({ kg: this.collectedMaterials.metal }));
    }

    // After adding the points, calculate the total
    this.store.dispatch(calculateTotalPoints());
  }

  ngOnInit() {
    this.store.select(selectTotalPoints).subscribe((totalPoints: number) => {
      this.points = totalPoints;
    });
  }
}
