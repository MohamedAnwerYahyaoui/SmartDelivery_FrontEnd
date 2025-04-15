import {Component, OnInit} from '@angular/core';
import {RepasService} from "../../service/repas.service";
import {Router} from "@angular/router";
import { Repas } from '../../models/repas.model';

@Component({
  selector: 'app-repas-list',
  templateUrl: './repas-list.component.html',
  styleUrls: ['./repas-list.component.css']
})
export class RepasListComponent implements OnInit {
  repasList: Repas[] = [];
  filteredRepas: Repas[] = [];
  searchTerm: string = '';

  constructor(private repasService: RepasService, private router: Router) { }

  ngOnInit(): void {
    this.loadRepas();
  }

  loadRepas(): void {
    this.repasService.getAllRepas().subscribe({
      next: (data) => {
        this.repasList = data;
        this.filteredRepas = [...data];
      },
      error: (err) => console.error('Error loading repas:', err)
    });
  }

  deleteRepas(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce repas?')) {
      this.repasService.deleteRepas(id).subscribe({
        next: () => {
          this.repasList = this.repasList.filter(repas => repas.id !== id);
          this.filteredRepas = this.filteredRepas.filter(repas => repas.id !== id);
        },
        error: (err) => console.error('Error deleting repas:', err)
      });
    }
  }

  filterRepas(): void {
    if (!this.searchTerm) {
      this.filteredRepas = [...this.repasList];
      return;
    }
    this.filteredRepas = this.repasList.filter(repas =>
      repas.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repas.desc.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}