import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RestaurantService } from "../../service/restaurant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  isEditMode = false;
  restaurantId?: number;
  isLoading = false;
  errorMessage: string | null = null;
  pageTitle: string = 'Ajouter un restaurant';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.restaurantForm = this.fb.group({
      montantTotal: [0, [Validators.required, Validators.min(0)]],
      status: [true, Validators.required],
      nomresto: ["Nom", Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.pageTitle = 'Modifier le restaurant';
        this.restaurantId = +params['id'];
        this.loadRestaurant(this.restaurantId);
      }
    });
  }

  loadRestaurant(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.restaurantService.getRestaurantById(id).pipe(
      catchError(err => {
        console.error('Error loading restaurant:', err);
        this.errorMessage = 'Échec du chargement du restaurant. Veuillez réessayer.';
        return of(null);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(restaurant => {
      if (restaurant) {
        this.restaurantForm.patchValue({
          montantTotal: restaurant.mantantTotale,
          status: restaurant.Status
        });
      }
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Préparation des données pour le backend
    const restaurantData: Restaurant = {
      idRestaurant: this.restaurantId,
      nomresto: this.restaurantForm.value.nomresto,
      mantantTotale: this.restaurantForm.value.montantTotal,
      Status: this.restaurantForm.value.status
    };

    const operation$ = this.isEditMode && this.restaurantId
      ? this.restaurantService.updateRestaurant(this.restaurantId, restaurantData)
      : this.restaurantService.createRestaurant(restaurantData);

    operation$.subscribe({
      next: () => {
        this.router.navigate(['/dashboard/restaurant/list']);
      },
      error: (err) => {
        console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} restaurant:`, err);
        this.errorMessage = `Échec de ${this.isEditMode ? 'la modification' : "l'ajout"} du restaurant.`;
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/restaurant/list']);
  }
}