import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  private collectors: any[] = JSON.parse(localStorage.getItem('collectors') || '[]');

  private connectedUser: any;

  constructor() {
    if (this.collectors.length === 0) {
      this.preRegisterCollectors();
    }
  }

  private preRegisterCollectors(): void {
    const collector1 = {
      nom: 'Collecteur 1',
      prenom: 'Test',
      email: 'collector1@example.com',
      password: '123456',
      adresse: 'Casa',
      telephone: '1234567890',
      dateNaissance: '1990-01-01',
      role: 'collector',
      photo: null,
    };

    const collector2 = {
      nom: 'Collecteur 2',
      prenom: 'Test',
      email: 'collector2@example.com',
      password: '123456',
      adresse: 'Safi',
      telephone: '0987654321',
      dateNaissance: '1992-02-02',
      role: 'collector',
      photo: null,
    };

    const collector3 = {
      nom: 'Collecteur 3',
      prenom: 'Test',
      email: 'collector3@example.com',
      password: '123456',
      adresse: 'Rabat',
      telephone: '0987654321',
      dateNaissance: '1996-02-02',
      role: 'collector',
      photo: null,
    };

    this.collectors.push(collector1, collector2,collector3);

    localStorage.setItem('collectors', JSON.stringify(this.collectors));
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async register(formData: FormData): Promise<Observable<boolean>> {
    const email = formData.get('email') as string;

    if (this.users.find(user => user.email === email)) {
      return of(false);
    }

    const file = formData.get('photo') as File;

    let base64Image = null;
    if (file) {
      base64Image = await this.convertToBase64(file);
    }

    const newUser = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: email,
      password: formData.get('password'),
      adresse: formData.get('adresse'),
      telephone: formData.get('telephone'),
      dateNaissance: formData.get('dateNaissance'),
      role: formData.get('role'),
      photo: base64Image,
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return of(true);
  }


  login(email: string, password: string): Observable<boolean> {
    const users = [...this.users, ...JSON.parse(localStorage.getItem('collectors') || '[]')];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      this.connectedUser = user;
      localStorage.setItem('connectedUser', JSON.stringify(user));

      if (user.role === 'collector') {
        return of(true);
      } else if(user.role === 'particular'){
        return of(true);
      }
    }
    return of(false);
  }


  logout(): void {
    this.connectedUser = null;
    localStorage.removeItem('connectedUser');
  }

  getConnectedUser(): any {
    return JSON.parse(localStorage.getItem('connectedUser') || 'null');
  }
}
