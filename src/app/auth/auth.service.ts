import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  private users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor() {}

  register(formData: FormData): Observable<boolean> {
    const email = formData.get('email') as string;

    if (this.users.find(user => user.email === email)) {
      return of(false);
    }

    const newUser = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: email,
      password: formData.get('password'),
      adresse: formData.get('adresse'),
      telephone: formData.get('telephone'),
      dateNaissance: formData.get('dateNaissance'),
      role:formData.get('role'),
      photo: formData.get('photo') ? URL.createObjectURL(formData.get('photo') as Blob) : null,
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return of(true);
  }


  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
