import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  connectedUser: any = {};
  currentPage: string = 'myRequests';
  isEditing: boolean = false;
  updatedUser: any = { ...this.connectedUser };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUser();
    if (!this.connectedUser) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showMyRequests(): void {
    this.currentPage = 'myRequests';
  }

  showProfile(): void {
    this.currentPage = 'profile';
  }

  setPage(page: string) {
    this.currentPage = page;
  }

  editProfile() {
    this.isEditing = true;
    this.updatedUser = { ...this.connectedUser };
  }

  saveProfile() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.connectedUser.email);
    console.log("index ",index);

    if (index !== -1) {
      users[index] = { ...this.updatedUser };
      localStorage.setItem('users', JSON.stringify(users));
      this.connectedUser = { ...this.updatedUser };
      alert('✅ Informations mises à jour avec succès !');
    }

    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  deleteAccount() {
    const confirmation = confirm("❗ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
    if (confirmation) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter((u: any) => u.email !== this.connectedUser.email);

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('user');
      alert('🗑️ Compte supprimé avec succès.');

      this.router.navigate(['/login']);
    }
  }



}
