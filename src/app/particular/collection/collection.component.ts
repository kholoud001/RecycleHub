import { Component, OnInit } from '@angular/core';
import { CollectionRequest } from './collection-request.model';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collection',
  standalone: false,
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  newRequest: CollectionRequest = {
    userId: '',
    id: 0,
    typeDechets: [],
    poids: 1000,
    adresse: '',
    dateCollecte: '',
    creneauHoraire: '',
    statut: 'en attente'
  };
  requests: CollectionRequest[] = [];
  isAddingRequest: boolean = false;
  minDate: string = '';
  connectedUser: any;  // Define connectedUser

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    // Assume `connectedUser` is stored in localStorage or fetched from a service
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');

    if (this.connectedUser && this.connectedUser.id) {
      this.newRequest.userId = this.connectedUser.id;
    }

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.loadRequests(); // Load the requests for the connected user
  }

  loadRequests(): void {
    if (this.connectedUser && this.connectedUser.id) {
      this.requests = this.collectionService.getRequests(this.connectedUser.id);
    }
  }

  toggleAddRequest(): void {
    this.isAddingRequest = !this.isAddingRequest;
  }

  addRequest(): void {
    const today = new Date();
    const selectedDate = new Date(this.newRequest.dateCollecte);

    if (selectedDate < today) {
      alert('⚠️ La date doit être aujourd\'hui ou après.');
      return;
    }

    if (this.newRequest.poids < 1000) {
      alert('⚠️ Le poids minimum est de 1000g.');
      return;
    }

    if (this.collectionService.addRequest(this.newRequest)) {
      this.loadRequests();
      this.newRequest = {
        userId: '',
        id: 0, typeDechets: [], poids: 1000, adresse: '', dateCollecte: '', creneauHoraire: '', statut: 'en attente' };
      this.isAddingRequest = false;
    }
  }

  deleteRequest(id: number): void {
    if (this.connectedUser && this.connectedUser.id) {
      this.collectionService.deleteRequest(id, this.connectedUser.id);
      this.loadRequests();
    }
  }
}
