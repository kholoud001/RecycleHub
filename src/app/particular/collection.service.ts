import { Injectable } from '@angular/core';
import { CollectionRequest } from './collection/collection-request.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly STORAGE_KEY = 'collectionRequests';

  constructor() {}

  getRequests(userId: string): CollectionRequest[] {
    const allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return allRequests.filter((req: { userId: string; }) => req.userId === userId);
  }

  addRequest(request: CollectionRequest): boolean {
    let requests = this.getRequests(request.userId);

    const activeRequests = requests.filter(req => req.statut !== 'en attente');
    if (activeRequests.length >= 3) {
      alert('⚠️ Vous avez déjà 3 demandes validées ou rejetées.');
      return false;
    }

    const totalWeight = requests.reduce((sum, req) => sum + req.poids, 0);
    if (totalWeight + request.poids > 10000) {
      alert('⚠️ Le poids total des collectes ne doit pas dépasser 10kg.');
      return false;
    }

    request.id = Date.now();
    request.statut = 'en attente';
    requests.push(request);

    let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    allRequests.push(request);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allRequests));

    return true;
  }

  updateRequest(updatedRequest: CollectionRequest): void {
    let requests = this.getRequests(updatedRequest.userId);
    const index = requests.findIndex(req => req.id === updatedRequest.id);
    if (index !== -1) {
      requests[index] = updatedRequest;

      // Met à jour les demandes dans le stockage local
      let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      const allIndex = allRequests.findIndex((req: { id: number; }) => req.id === updatedRequest.id);
      if (allIndex !== -1) {
        allRequests[allIndex] = updatedRequest;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allRequests));
      }
    }
  }

  // Supprime une demande
  deleteRequest(id: number, userId: string): void {
    let requests = this.getRequests(userId);
    requests = requests.filter(req => req.id !== id);

    // Sauvegarde la liste mise à jour dans le stockage local
    let allRequests = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    allRequests = allRequests.filter((req: { id: number; }) => req.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allRequests));
  }
}
