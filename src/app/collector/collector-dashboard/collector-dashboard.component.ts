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

  logout(): void {
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
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.connectedUser.email);

    console.log("🔍 Index trouvé:", index);
    console.log("📋 Avant mise à jour:", JSON.stringify(users[index]));

    if (index !== -1) {
      users[index] = { ...this.updatedUser };
      localStorage.setItem('users', JSON.stringify(users));

      this.connectedUser = { ...this.updatedUser };
      localStorage.setItem('user', JSON.stringify(this.connectedUser));
      localStorage.setItem('connectedUser', JSON.stringify(this.connectedUser));


      console.log("✅ Après mise à jour:", JSON.stringify(users[index]));
      alert('✅ Informations mises à jour avec succès !');
    } else {
      console.error("❌ Utilisateur introuvable !");
    }

    this.isEditing = false;
  }


  cancelEdit() {
    this.isEditing = false;
  }

  deleteAccount() {
    const confirmation = confirm("❗ Êtes-vous sûr de vouloir supprimer votre compte ?");

    if (confirmation) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter((u: any) => u.email !== this.connectedUser.email); // 🚮 Filtrer l'utilisateur

      localStorage.setItem('users', JSON.stringify(users)); // 💾 Sauvegarder la nouvelle liste
      localStorage.removeItem('user'); // ❌ Supprimer `connectedUser`

      alert('🗑️ Compte supprimé avec succès.');
      this.router.navigate(['/login']); // 🔄 Rediriger vers la page de connexion
    }
  }

}
