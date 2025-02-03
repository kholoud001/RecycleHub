import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateNaissance: ['', [Validators.required, this.minimumAgeValidator(18)]],
      photo: [null],
      role: ['particular'],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.registerForm.value.nom);
    formData.append('prenom', this.registerForm.value.prenom);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('adresse', this.registerForm.value.adresse);
    formData.append('telephone', this.registerForm.value.telephone);
    formData.append('dateNaissance', this.registerForm.value.dateNaissance);
    formData.append('role', this.registerForm.value.role);


    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Inscription réussie !',
          text: 'Votre compte a été créé avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'inscription.',
          icon: 'error',
          confirmButtonText: 'Réessayer'
        });
      }
    });
  }

  minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < minAge || (age === minAge && today < new Date(birthDate.setFullYear(birthDate.getFullYear() + minAge)))) {
        return { minimumAge: { requiredAge: minAge, actualAge: age } };
      }

      return null;
    };
  }
}

