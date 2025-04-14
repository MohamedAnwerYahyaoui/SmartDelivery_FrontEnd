import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AppNotification } from 'src/app/models/AppNotification';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-notification',
  templateUrl: './liste-notification.component.html',
  styleUrls: ['./liste-notification.component.css']
})
export class ListeNotificationComponent implements OnInit, OnDestroy {
  notifications: AppNotification[] = [];
  private wsSubscription!: Subscription;

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }
  /* Méthode pour déterminer l'emoji en fonction du nom */
  getGenderEmoji(nomClient?: string): string {
    if (!nomClient) {
      return '👤';  // Emoji neutre si pas de nom
    }
    // Exemple naïf : si le nom se termine par 'a' ou 'e', on suppose féminin
    // Vous pouvez adapter selon votre logique ou un champ "genre" dans l'entité
    const nameLower = nomClient.toLowerCase();
    const lastChar = nameLower.slice(-1);
    if (['a', 'e'].includes(lastChar)) {
      return '👩'; // Femme
    }
    return '👨';   // Homme
  }


  markAsRead(notification: AppNotification): void {
    this.notificationService.markAsRead(notification.idNotification!).subscribe(() => {
      notification.read = true;
    });
  }

  markAsUnread(notification: AppNotification): void {
    this.notificationService.markAsUnread(notification.idNotification!).subscribe(() => {
      notification.read = false;
    });
  }

  editNotification(notification: AppNotification): void {
    // Redirige vers le formulaire d'édition en passant l'ID dans l'URL
    this.router.navigate(['/dashboard/notification', notification.idNotification]);
  }

  deleteNotification(notification: AppNotification): void {
    if (confirm('Voulez-vous vraiment supprimer cette notification ?')) {
      this.notificationService.deleteNotification(notification.idNotification!)
        .subscribe({
          next: (response) => {
            // Success : pas d’erreur JSON désormais
            console.log('Réponse suppression :', response);
            // On retire localement la notification de la liste
            this.notifications = this.notifications.filter(
              n => n.idNotification !== notification.idNotification
            );
            alert('Notification supprimée avec succès!');
          },
          error: (err) => {
            alert('Erreur lors de la suppression!');
            console.error(err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }
}
