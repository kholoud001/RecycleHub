import { Component, OnInit } from '@angular/core';
import { CollectionRequest } from './collection-request.model';
import { CollectionService } from '../collection.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection',
  standalone: false,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
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
  connectedUser: any;

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');

    if (this.connectedUser?.id) {
      this.newRequest.userId = this.connectedUser.id;
    }

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.loadRequests();
  }

  loadRequests(): void {
    if (this.connectedUser?.id) {
      this.requests = this.collectionService.getRequests(this.connectedUser.id);
    }
  }

  toggleAddRequest(): void {
    this.isAddingRequest = !this.isAddingRequest;

    if (!this.isAddingRequest) {
      if (this.newRequest.id === 0) {
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.newRequest = {
      userId: this.connectedUser.id,
      id: 0,
      typeDechets: [],
      poids: 1000,
      adresse: '',
      dateCollecte: '',
      creneauHoraire: '',
      statut: 'en attente'
    };
  }

  addRequest(): void {

    if (!this.newRequest.dateCollecte || !this.newRequest.adresse || this.newRequest.typeDechets.length === 0) {
      Swal.fire('Erreur', 'Tous les champs sont obligatoires.', 'warning');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(this.newRequest.dateCollecte);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Swal.fire('Erreur', "La date doit être aujourd'hui ou après.", 'warning');
      return;
    }


    if (this.newRequest.poids < 1000) {
      Swal.fire('Erreur', 'Le poids minimum est de 1000g.', 'warning');
      return;
    }

    if (this.newRequest.id === 0) {
      if (this.collectionService.addRequest(this.newRequest)) {
        Swal.fire('Succès', 'Demande ajoutée avec succès !', 'success');
        this.loadRequests();
        this.toggleAddRequest();
      }
    } else {
      // console.log('Mise à jour de la demande :', this.newRequest);
      if (this.collectionService.updateRequest(this.newRequest)) {
        Swal.fire('Succès', 'Demande mise à jour avec succès !', 'success');
        this.loadRequests();
        this.toggleAddRequest();
      }
    }
  }

  deleteRequest(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.connectedUser?.id) {
          this.collectionService.deleteRequest(id, this.connectedUser.id);
          this.loadRequests();
          Swal.fire('Supprimé', 'La demande a été supprimée.', 'success');
        }
      }
    });
  }

  updateRequest(request: CollectionRequest): void {
    this.newRequest = { ...request };
    this.isAddingRequest = true;
  }

  submitRequest(): void {
    if (this.newRequest.id) {
      if (this.collectionService.updateRequest(this.newRequest)) {
        Swal.fire('Succès', ' Demande modifiée avec succès !', 'success');
        this.isAddingRequest = false;
        this.loadRequests();
      }
    } else {
      this.addRequest();
    }
  }

  cancelEdit(): void {
    this.isAddingRequest = false;
    this.resetForm();
  }



}
