import { Component, OnInit } from '@angular/core';
import { CollectorService } from '../CollectorService';
import { Store } from '@ngrx/store';
import { CommonModule, NgForOf } from '@angular/common';
import Swal from 'sweetalert2';
import {addPoints} from '../store/point.actions';
import {Observable} from 'rxjs';
import {selectPointsByRequestId} from '../store/point.selectors';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  connectedUser: any = null;
  requests: any[] = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
  filteredRequests: any[] = [];

  constructor(
    private collectorService: CollectorService,
    protected store: Store
  )
  {
    this.connectedUser = JSON.parse(localStorage.getItem('connectedUser') || 'null');
    this.filterRequests();
  }

  ngOnInit(): void {
    this.filterRequests();

  }

  filterRequests() {
    if (this.connectedUser) {
      const userCity = this.getCityFromAddress(this.connectedUser.adresse);
      this.filteredRequests = this.requests.filter((request) => {
        return this.getCityFromAddress(request.adresse) === userCity;
      });
    }
  }

  getCityFromAddress(address: string): string {
    const parts = address.split(',');
    return parts[parts.length - 1].trim().toLowerCase();
  }


  toggleDropdown(requestId: number) {
    const request = this.requests.find(r => r.id === requestId);
    if (request) {
      request.showDropdown = !request.showDropdown;
    }
  }

  changeStatus(request: any, event: any) {
    const newStatus = event.target.value;
    request.statut = newStatus;

    this.collectorService.updateRequestInLocalStorage(request);

    if (newStatus === 'validée') {
      this.assignPoints(request);
    }

    Swal.fire({
      title: 'Statut mis à jour !',
      text: `Le statut de la demande est maintenant "${newStatus}".`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }


  assignPoints(request: any) {
    let points = 0;

    const poidsEnKg = request.poids / 1000;

    // console.log('request.typeDechets:', request.typeDechets);
    // console.log('request.poids (en grammes):', request.poids);
    // console.log('Poids en kg:', poidsEnKg);

    if (!request.typeDechets || !Array.isArray(request.typeDechets)) {
      console.error('Erreur : typeDechets n\'est pas un tableau ou est undefined.');
      return;
    }

    request.typeDechets.forEach((type: string) => {
      switch (type) {
        case 'plastique':
          points += poidsEnKg * 2;
          break;
        case 'verre':
          points += poidsEnKg * 1;
          break;
        case 'papier':
          points += poidsEnKg * 1;
          break;
        case 'métal':
          points += poidsEnKg * 5;
          break;
        default:
          console.warn('Type de déchets non pris en charge:', type);
          break;
      }
    });

    this.store.dispatch(addPoints({ requestId: request.id, points }));
  }

  protected readonly selectPointsByRequestId = selectPointsByRequestId;
}
