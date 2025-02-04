import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['particular', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          Swal.fire({
            title: 'Connexion réussie!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirection selon le rôle de l'utilisateur
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (currentUser.role === 'collector') {
              this.router.navigate(['/collector-dashboard']); // Rediriger vers le tableau de bord des collecteurs
            } else {
              this.router.navigate(['/dashboard']); // Rediriger vers le tableau de bord des particuliers
            }
          });
        } else {
          Swal.fire({
            title: 'Erreur',
            text: 'Identifiants incorrects.',
            icon: 'error',
            confirmButtonText: 'Réessayer'
          });
        }
      },
      error: () => {
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue.',
          icon: 'error',
          confirmButtonText: 'Réessayer'
        });
      }
    });
  }
}
