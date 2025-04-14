import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { AppNotification } from 'src/app/models/AppNotification';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private notificationsSubject = new Subject<AppNotification>();
  public notifications$: Observable<AppNotification> = this.notificationsSubject.asObservable();

  private stompClient!: Client;
  // Assurez-vous que l'URL correspond à votre configuration (port, contexte, etc.)
  private serverUrl = 'http://localhost:8081/ws-notifications';

  connect(): void {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(this.serverUrl),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('[WebSocket Debug] ' + str);
      }
    });

    this.stompClient.onConnect = frame => {
      console.log('Connecté au WebSocket STOMP:', frame);

      // S'abonner à la destination privée de l'utilisateur
      this.stompClient.subscribe('/user/queue/notifications', (message: IMessage) => {
        if (message.body) {
          const notif: AppNotification = JSON.parse(message.body);
          console.log('Notification reçue via WebSocket:', notif);
          this.notificationsSubject.next(notif);
        }
      });
    };

    this.stompClient.onStompError = frame => {
      console.error('Erreur STOMP:', frame.headers['message']);
      console.error('Détails:', frame.body);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('Déconnecté du WebSocket STOMP');
    }
  }

  sendNotification(notification: AppNotification): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.publish({
        destination: '/app/sendNotification',
        body: JSON.stringify(notification)
      });
      console.log('Notification envoyée :', notification);
    } else {
      console.warn('Impossible d\'envoyer la notification, le client STOMP n\'est pas connecté.');
    }
  }
}
