export interface AppNotification {
  idNotification: number | null;
  nomClient: string;
  contenu: string;
  date: Date;
  read: boolean;
}
