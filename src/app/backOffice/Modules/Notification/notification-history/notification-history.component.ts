import { Component, OnInit } from '@angular/core';
import { AppNotification } from '../models/AppNotification';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.css']
})
export class NotificationHistoryComponent implements OnInit {
  nomClient: string = '';
  notifications: AppNotification[] = [];
  errorMessage: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  getHistory(): void {
    if (this.nomClient.trim() !== '') {
      this.notificationService.getNotificationHistory(this.nomClient).subscribe(
        (data) => {
          this.notifications = data;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la récupération de l\'historique des notifications.';
          console.error(error);
        }
      );
    }
  }

  /**
   * Détermine si le nom est féminin (simplement si le nom se termine par 'e').
   * Ajustez la logique selon vos besoins réels.
   */
  isFeminine(name: string): boolean {
    return name.toLowerCase().endsWith('e');
  }

  /**
   * Retourne un emoji correspondant au contenu.
   * Exemples : "Livraison" => 🚚, "Retard" => ⏰
   * Vous pouvez ajouter d'autres règles selon votre contexte.
   */
  getEmojiForContent(content: string): string {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('livraison')) {
      return '🚚 ';
    } else if (lowerContent.includes('retard')) {
      return '⏰ ';
    } else if (lowerContent.includes('annulé')) {
      return '❌ ';
    } 
    // Emoji par défaut si pas de correspondance
    return '🔔 ';
  }
}