import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../service/restaurant.service";
import {Router} from "@angular/router";
import {Restaurant} from "../../module/restaurant.model";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent  implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.restaurantService.getAllRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.filteredRestaurants = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading restaurants:', err);
        this.errorMessage = 'Failed to load restaurants. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  deleteRestaurant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter(r => r.idRestaurant !== id);
          this.filteredRestaurants = this.filteredRestaurants.filter(r => r.idRestaurant !== id);
        },
        error: (err) => {
          console.error('Error deleting restaurant:', err);
          this.errorMessage = 'Failed to delete restaurant.';
        }
      });
    }
  }

  toggleStatus(restaurant: Restaurant): void {
    if (!restaurant.idRestaurant) return;

    this.restaurantService.toggleRestaurantStatus(restaurant.idRestaurant)
      .subscribe({
        next: (updatedRestaurant) => {
          restaurant.Status = updatedRestaurant.Status;
        },
        error: (err) => {
          console.error('Error toggling status:', err);
          this.errorMessage = 'Failed to update restaurant status.';
        }
      });
  }

  filterRestaurants(): void {
    if (!this.searchTerm) {
      this.filteredRestaurants = [...this.restaurants];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.idRestaurant?.toString().includes(term) ||
      restaurant.mantantTotale.toString().includes(term)
    );
  }

}
