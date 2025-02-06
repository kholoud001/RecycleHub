import { Injectable } from '@angular/core';
import { CollectionRequest } from './collection/collection-request.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly STORAGE_KEY = 'collectionRequests';

  constructor() {}

  getRequests(userId: string): CollectionRequest[] {
    const allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return allRequests.filter((req: { userId: string }) => req.userId === userId);
  }

  addRequest(request: CollectionRequest): boolean {
    let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    const userRequests = allRequests.filter((req: { userId: string }) => req.userId === request.userId);
    const activeRequests = userRequests.filter((req: { statut: string }) => req.statut !== 'en attente');

    if (activeRequests.length >= 3) {
      Swal.fire({
        title: 'Demande refusée ⚠️',
        text: 'Vous avez déjà 3 demandes validées ou rejetées.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return false;
    }

    const totalWeight = userRequests.reduce((sum: any, req: { poids: any }) => sum + req.poids, 0);
    if (totalWeight + request.poids > 10000) {
      Swal.fire({
        title: 'Poids dépassé ⚠️',
        text: 'Le poids total des collectes ne doit pas dépasser 10kg.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return false;
    }

    request.id = Date.now();
    request.statut = 'en attente';
    allRequests.push(request);

    this.saveRequestsToLocalStorage(allRequests);

    Swal.fire({
      title: 'Demande ajoutée ✅',
      text: 'Votre demande a été enregistrée avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    return true;
  }

  updateRequest(updatedRequest: CollectionRequest): boolean {
    let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    const requestIndex = allRequests.findIndex((req: { id: number }) => req.id === updatedRequest.id);

    if (requestIndex === -1 || allRequests[requestIndex].statut !== 'en attente') {
      Swal.fire({
        title: 'Modification impossible ⚠️',
        text: 'Vous ne pouvez modifier que les demandes en attente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return false;
    }

    allRequests[requestIndex] = updatedRequest;
    this.saveRequestsToLocalStorage(allRequests);

    Swal.fire({
      title: 'Modification réussie ✅',
      text: 'Votre demande a été mise à jour avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    return true;
  }

  deleteRequest(id: number, userId: string): void {
    let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    allRequests = allRequests.filter((req: { id: number }) => req.id !== id);

    this.saveRequestsToLocalStorage(allRequests);

    Swal.fire({
      title: 'Demande supprimée ❌',
      text: 'Votre demande a été supprimée avec succès.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }


  private saveRequestsToLocalStorage(requests: CollectionRequest[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(requests));
  }
}
