import { Component, OnInit } from '@angular/core';
import {CollectorService} from '../CollectorService';
import {CommonModule, NgForOf} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  connectedUser: any = null;
  requests: any[] = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
  filteredRequests: any[] = [];


  constructor(private collectorService: CollectorService) {
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

    Swal.fire({
      title: 'Statut mis à jour !',
      text: `Le statut de la demande est maintenant "${newStatus}".`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

  }





}
