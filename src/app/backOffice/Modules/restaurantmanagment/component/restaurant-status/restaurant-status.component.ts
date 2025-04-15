import {Component, OnInit} from '@angular/core';
import {RepasService} from "../../service/repas.service";
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-status',
  templateUrl: './restaurant-status.component.html',
  styleUrls: ['./restaurant-status.component.css']
})
export class RestaurantStatusComponent implements OnInit {
  restaurantStats?: Restaurant;
  totalRevenue: number = 0;

  constructor(private repasService: RepasService) { }

  ngOnInit(): void {
    this.loadRestaurantStats();
  }

  loadRestaurantStats(): void {
    this.repasService.getRestaurantStats().subscribe({
      next: (data) => {
        this.restaurantStats = data;
      },
      error: (err) => console.error('Error loading stats:', err)
    });

    // Calcul du revenu total (amélioration)
    this.repasService.getAllRepas().subscribe(repasList => {
      this.totalRevenue = repasList.reduce((sum, repas) => sum + repas.prix, 0);
    });
  }
}