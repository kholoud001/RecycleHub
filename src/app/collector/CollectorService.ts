import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor() { }

  acceptCollection(request: any): void {
    request.statut = 'occupée'; // Change le statut en "occupée"
    this.updateRequestInLocalStorage(request);
  }

  startCollection(request: any): void {
    request.statut = 'en cours'; // Change le statut en "en cours"
    this.updateRequestInLocalStorage(request);
  }

  validateCollection(request: any): void {
    request.statut = 'validée'; // Change le statut en "validée"
    this.updateRequestInLocalStorage(request);
  }

  rejectCollection(request: any): void {
    request.statut = 'rejetée'; // Change le statut en "rejetée"
    this.updateRequestInLocalStorage(request);
  }

  updateRequestInLocalStorage(request: any) {
    let requests = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
    const index = requests.findIndex((r: { id: any; }) => r.id === request.id);
    if (index !== -1) {
      requests[index] = request;  // Remplacer la demande mise à jour
      localStorage.setItem('collectionRequests', JSON.stringify(requests));  // Sauvegarder dans le localStorage
    }
  }


}
