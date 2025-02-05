export interface CollectionRequest {
  id: number;
  userId: string;
  typeDechets: string[];
  photos?: string[];
  poids: number;
  adresse: string;
  dateCollecte: string;
  creneauHoraire: string;
  notes?: string;
  statut: 'en attente' | 'validée' | 'rejetée';
}
