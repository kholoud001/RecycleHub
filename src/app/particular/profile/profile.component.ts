import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  connectedUser: any = {};
  isEditing: boolean = false;
  updatedUser: any = { ...this.connectedUser };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUser();
    if (!this.connectedUser) {
      this.router.navigate(['/login']);
    }
  }

  editProfile() {
    this.isEditing = true;
    this.updatedUser = { ...this.connectedUser };
  }

  saveProfile() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === this.connectedUser.email);

    if (index !== -1) {
      users[index] = { ...this.updatedUser };
      localStorage.setItem('users', JSON.stringify(users));

      this.connectedUser = { ...this.updatedUser };
      localStorage.setItem('user', JSON.stringify(this.connectedUser));
      localStorage.setItem('connectedUser', JSON.stringify(this.connectedUser));

      Swal.fire({
        icon: 'success',
        title: 'Mise à jour réussie',
        text: '✅ Informations mises à jour avec succès !',
        confirmButtonColor: '#3085d6'
      });
    } else {
      console.error("❌ Utilisateur introuvable !");
    }

    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  deleteAccount() {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Votre compte sera définitivement supprimé.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter((u: any) => u.email !== this.connectedUser.email);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('user');
        localStorage.removeItem('connectedUser');

        Swal.fire({
          icon: 'success',
          title: 'Compte supprimé',
          text: '🗑️ Votre compte a été supprimé avec succès.',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
