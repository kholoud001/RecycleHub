import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-collector-dashboard',
  standalone: false,

  templateUrl: './collector-dashboard.component.html',
  styleUrl: './collector-dashboard.component.css'
})
export class CollectorDashboardComponent {

  connectedUser: any = null;
  currentPage: string = 'myRequests';
  collectedMaterials: any;
  vouchers = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];
  points: number = 0;
  isEditing: boolean = false;
  updatedUser: any = { ...this.connectedUser };

  constructor(private authService: AuthService, private router: Router) {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setPage(page: string) {
    this.currentPage = page;
  }

  validateCollection() {

  }

  convertPoints(points: number) {

  }




  editProfile() {
    this.isEditing = true;
    this.updatedUser = { ...this.connectedUser };
  }

  saveProfile() {
    this.connectedUser = { ...this.updatedUser };
    this.isEditing = false;
    alert('✅ Informations mises à jour avec succès !');
  }

  cancelEdit() {
    this.isEditing = false;
  }

  deleteAccount() {
    const confirmation = confirm("❗ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (confirmation) {
      alert('🗑️ Compte supprimé avec succès.');
      window.location.href = '/login';
    }
  }
}
