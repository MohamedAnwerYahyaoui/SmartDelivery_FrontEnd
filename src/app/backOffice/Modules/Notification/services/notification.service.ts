import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Stats } from '../models/Stats';
import { GroupNotification } from '../models/GroupNotification';
import { AppNotification } from '../models/AppNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8066/notification';
  notificationService: any;
  notifications: any;

  constructor(private http: HttpClient) { }

  // Récupérer toutes les notifications et transformer la réponse en AppNotification[]
  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      map(response => response.map(item => ({
          idNotification: item.idNotification,
          nomClient: item.nomClient,
          contenu: item.contenu,    // Assurez-vous que la casse correspond au JSON (ici "contenu")
          date: new Date(item.date), // Conversion en objet Date
          read: item.read
      })))
    );
  }
    // Récupérer une notification par ID
    getNotification(id: number): Observable<AppNotification> {
      return this.http.get<AppNotification>(`${this.baseUrl}/${id}`);
    }
  
    // Créer une nouvelle notification
    createNotification(notification: AppNotification): Observable<AppNotification> {
      return this.http.post<AppNotification>(`${this.baseUrl}/ajouter`, notification);
    }
  
    // Mettre à jour une notification existante
    updateNotification(id: number, notification: AppNotification): Observable<AppNotification> {
      return this.http.put<AppNotification>(`${this.baseUrl}/${id}`, notification);
    }
  
    deleteNotification(id: number): Observable<any> {
      // On précise que le responseType est 'text'
      return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
  
    // Marquer une notification comme lue
    markAsRead(id: number): Observable<AppNotification> {
      return this.http.post<AppNotification>(`${this.baseUrl}/${id}/markAsRead`, {});
    }
  
    // Marquer une notification comme non lue
    markAsUnread(id: number): Observable<AppNotification> {
      return this.http.post<AppNotification>(`${this.baseUrl}/${id}/markAsUnread`, {});
    }
  
   // Historique d'un client donné
  getNotificationHistory(nomClient: string): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.baseUrl}/history/${nomClient}`);
  }
  // Statistiques globales des notifications
  getNotificationStats(): Observable<Stats> {
    return this.http.get<Stats>(`${this.baseUrl}/stats`);
  }

  // Envoi groupé de notifications personnalisées
  sendGroupNotifications(groupNotification: GroupNotification): Observable<AppNotification[]> {
    return this.http.post<AppNotification[]>(`${this.baseUrl}/group`, groupNotification);
  }
  }