import { Component, OnInit } from '@angular/core';
import { Commande, Status } from '../models/Commande.model';
import { CommandeService } from '../commande.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType, ChartData, ChartDataset } from 'chart.js';  // Ajuster l'importation
@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  selectedCommande: Commande | null = null;
  status = Status;
  errorMessage: string | null = null;
  totalCommandes: number = 0;
  totalMontant: number = 0;
  statusCount: { [key: string]: number } = {};

  // Graphique de statistiques de statut
  pieChartLabels: string[] = [];
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  pieChartType: ChartType = 'pie';

  constructor(private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadCommandes();
  }
  trackById(index: number, commande: any): number {
    return commande.idCommande;
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.errorMessage = null;

        this.totalCommandes = data.length;
        this.totalMontant = data.reduce((sum, c) => sum + (c.mantantTotal || 0), 0);

        this.statusCount = {};
        for (const cmd of data) {
          const status = cmd.status || 'Inconnu';
          this.statusCount[status] = (this.statusCount[status] || 0) + 1;
        }

        // Mise à jour des données pour le graphique
        this.updateChartData();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load commandes. Please try again later.';
        console.error('Failed to load commandes:', err);
      }
    });
  }
  updateChartData(): void {
    this.pieChartLabels = Object.keys(this.statusCount);
    this.pieChartData.datasets[0].data = Object.values(this.statusCount);  // Mettre les valeurs des statuts dans le dataset
  }

  deleteCommande(id: number | undefined): void {
    if (id === undefined) {
      this.errorMessage = 'Cannot delete commande: ID is undefined.';
      return;
    }
    if (confirm('Are you sure you want to delete this commande?')) {
      this.commandeService.deleteCommande(id).subscribe({
        next: () => {
          this.commandes = this.commandes.filter(commande => commande.idCommande !== id);
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete commande. Please try again later.';
          console.error('Failed to delete commande:', err);
        }
      });
    }
  }
  

  navigateToCreate(): void {
    this.router.navigate(['/dashboard/commande/create']);
  }

  navigateToEdit(id: number | undefined): void {
    if (id === undefined) {
      this.errorMessage = 'Cannot edit commande: ID is undefined.';
      return;
    }
    this.router.navigate([`/dashboard/commande/edit/${id}`]);
  }
  updateCommande(): void {
    if (!this.selectedCommande || this.selectedCommande.idCommande === undefined) {
      this.errorMessage = 'Invalid commande ID.';
      return;
    }
  
    this.commandeService.updateCommande(
      this.selectedCommande.idCommande,
      this.selectedCommande
    ).subscribe({
      next: (updatedCommande) => {
        // mettre à jour la commande dans le tableau si besoin
        const index = this.commandes.findIndex(c => c.idCommande === updatedCommande.idCommande);
        if (index !== -1) {
          this.commandes[index] = updatedCommande;
        }
        this.errorMessage = null;
        // afficher un message de succès ou rediriger
      },
      error: (err) => {
        this.errorMessage = 'Failed to update commande. Please try again later.';
        console.error('Update error:', err);
      }
    });
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'badge-warning'; // Exemple de classe pour statut 'Pending'
      case 'Completed':
        return 'badge-success'; // Exemple de classe pour statut 'Completed'
      case 'Cancelled':
        return 'badge-danger'; // Exemple de classe pour statut 'Cancelled'
      default:
        return 'badge-secondary'; // Classe par défaut
    }
  }}