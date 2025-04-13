import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../model/Promotion';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = "http://localhost:8066/pr/";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotion(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BASE_URL + "getP")
      .pipe(
        catchError(this.handleError)
      );
  }

  addPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(BASE_URL + "addP", promotion)
      .pipe(
        catchError(this.handleError)
      );
  }
  deletePromotion(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}delete/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
