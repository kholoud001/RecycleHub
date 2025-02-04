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

  register(formData: FormData): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const email = formData.get('email') as string;

      if (this.users.find(user => user.email === email)) {
        observer.next(false);
        observer.complete();
        return;
      }

      const file = formData.get('photo') as File;

      if (file) {
        this.convertToBase64(file).then(base64Image => {
          this.saveUser(formData, base64Image, observer);
        }).catch(error => {
          observer.error(error);
        });
      } else {
        this.saveUser(formData, null, observer);
      }
    });
  }

  private saveUser(formData: FormData, base64Image: string | null, observer: any) {
    const newUser = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: formData.get('email'),
      password: formData.get('password'),
      adresse: formData.get('adresse'),
      telephone: formData.get('telephone'),
      dateNaissance: formData.get('dateNaissance'),
      role: formData.get('role'),
      photo: base64Image,
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));

    observer.next(true);
    observer.complete();
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
