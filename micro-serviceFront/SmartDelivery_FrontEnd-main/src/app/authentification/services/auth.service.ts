import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  private apiUrl = 'http://localhost:8066/auth/auth'; // Spring Boot URL
  private tokenKey = 'construction_app_tokens';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        const decodedToken: any = jwtDecode(response.access_token);
        const roles = decodedToken.roles || []; // Extract roles from the token

        localStorage.setItem(this.tokenKey, JSON.stringify({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          username: decodedToken.preferred_username || username,
          roles: roles // Store roles
        }));
        this.router.navigate(['/dashboard']);
      })
    );
  }

  getUsername(): string | null {
    const tokens = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    return tokens.username || null;
  }

  logout(): void {
    const tokens = this.getTokens();
    if (tokens?.refresh_token) {
      this.http.post(`${this.apiUrl}/logout`, { 
        refresh_token: tokens.refresh_token 
      }).subscribe();
    }
    
    // Clear storage and redirect
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/signin']);
  }

  getAccessToken(): string | null {
    const tokens = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    return tokens.access_token || null;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private getTokens(): any {
    return JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
  }

  getRoles(): string[] {
    const tokens = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    return tokens.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

}