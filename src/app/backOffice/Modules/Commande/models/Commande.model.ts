export interface Commande {
    idCommande?: number; // Optional, as handled in CommandeListComponent
    mantantTotal: number;
    dateLiv: Date | string;
    status: Status;
  }
  
  export enum Status {
    Livrée = 'Livrée',
    nonLivrée = 'nonLivrée'
  }