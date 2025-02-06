import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor() { }


  updateRequestInLocalStorage(request: any) {
    let requests = JSON.parse(localStorage.getItem('collectionRequests') || '[]');
    const index = requests.findIndex((r: { id: any; }) => r.id === request.id);
    if (index !== -1) {
      requests[index] = request;
      localStorage.setItem('collectionRequests', JSON.stringify(requests));
    }
  }


}
