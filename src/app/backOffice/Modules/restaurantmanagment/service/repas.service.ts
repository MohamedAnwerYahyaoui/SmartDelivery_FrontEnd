import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Repas } from '../models/repas.model';
import { Restaurant } from '../models/restaurant.model';


@Injectable({
  providedIn: 'root'
})
export class RepasService {
  private apiUrl = 'http://localhost:8066/repas';

  constructor(private http: HttpClient) { }

  getAllRepas(): Observable<Repas[]> {
    return this.http.get<Repas[]>(this.apiUrl);
  }

  createRepas(repas: Repas): Observable<Repas> {
    return this.http.post<Repas>(`${this.apiUrl}/ajouter`, repas);
  }

  updateRepas(id: number, repas: Repas): Observable<Repas> {
    return this.http.put<Repas>(`${this.apiUrl}/${id}`, repas);
  }

  deleteRepas(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  // Amélioration: Statistiques du restaurant
  getRestaurantStats(): Observable<Restaurant> {
    return this.http.get<Restaurant>('http://localhost:8066/restaurant/stats');
  }
}