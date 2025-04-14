import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AppNotification } from 'src/app/models/AppNotification';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  clientName: string = '';
  messageContent: string = '';
  private notifSub!: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.connect();
    this.notifSub = this.webSocketService.notifications$.subscribe((notif) => {
      this.notifications.push(notif);
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    if (this.notifSub) {
      this.notifSub.unsubscribe();
    }
  }

  sendTestNotification(): void {
    const testNotif: AppNotification = {
      nomClient: this.clientName || 'ClientAnonyme',
      contenu: this.messageContent || 'Message par défaut',
      date: new Date(),
      read: false,
      idNotification: null
    };
    this.webSocketService.sendNotification(testNotif);
    this.messageContent = '';
  }
}
