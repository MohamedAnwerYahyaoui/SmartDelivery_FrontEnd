import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8066/restaurant';


  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/all`);
  }

  createRestaurant(restaurant: Omit<Restaurant, 'idRestaurant'>): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/ajouter`, restaurant);
  }

  updateRestaurant(id: number, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(
      `${this.apiUrl}/${id}`, // Correspond à @PutMapping("/{id}")
      {
        nomresto: restaurant.nomresto,
        mantantTotale: restaurant.mantantTotale,
        Status: restaurant.Status
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }












  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/find/${id}`);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleRestaurantStatus(id: number): Observable<Restaurant> {
    return this.http.patch<Restaurant>(
      `${this.apiUrl}/${id}/toggle-status`,
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  updateRestaurantTotal(id: number, amount: number): Observable<Restaurant> {
    return this.http.patch<Restaurant>(`${this.apiUrl}/${id}/update-total`, { amount });
  }
}