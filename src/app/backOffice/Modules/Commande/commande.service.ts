import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Commande, Status } from './models/Commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8066/commande';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/list`).pipe(
      catchError(this.handleError)
    );
  }

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/ajouter`, commande).pipe(
      catchError(this.handleError)
    );
  }

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${id}`, commande).pipe(
      catchError(this.handleError)
    );
  }
  

  deleteCommande(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  
  

  getTotalAmount(status?: Status): Observable<number> {
    const url = status ? `${this.apiUrl}/total-amount?status=${status}` : `${this.apiUrl}/total-amount`;
    return this.http.get<number>(url).pipe(
      catchError(this.handleError)
    );
  }

  getCommandesByStatus(status: Status): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/status?status=${status}`).pipe(
      catchError(this.handleError)
    );
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}