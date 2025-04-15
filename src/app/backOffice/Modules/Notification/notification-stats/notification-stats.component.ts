import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { NotificationService } from '../services/notification.service';

interface Stats {
  total: number;
  read: number;
  unread: number;
}

@Component({
  selector: 'app-notification-stats',
  templateUrl: './notification-stats.component.html',
  styleUrls: ['./notification-stats.component.css']
})
export class NotificationStatsComponent implements OnInit {
  stats: Stats | null = null;
  errorMessage: string = '';

  // Configuration des données pour le pie chart
  public pieChartData: ChartData = {
    labels: ['Lues', 'Non lues'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384'] // Couleurs du camembert
      }
    ]
  };
  

  // Type de chart
  public pieChartType: ChartType = 'pie';

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.notificationService.getNotificationStats().subscribe(
      (data: Stats) => {
        this.stats = data;
        this.errorMessage = '';
        if (this.pieChartData.datasets?.[0]) {
          this.pieChartData.datasets[0].data = [data.read, data.unread];
        }
        // Forcer la détection si besoin
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors de la récupération des statistiques.';
        console.error('Erreur : ', error);
      }
    );
  }
}