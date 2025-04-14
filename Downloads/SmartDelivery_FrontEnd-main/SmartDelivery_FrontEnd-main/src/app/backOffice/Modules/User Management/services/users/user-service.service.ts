import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRecord } from '../../models/user-record';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8066/auth/users';

  constructor(private http: HttpClient) { }

  createUser(user: UserRecord): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, user);
  }
  

  createClientAccount(user: UserRecord): Observable<any> {
    return this.http.post(`${this.apiUrl}/addClient`, user);
  }
  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/all`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  sendResetLink(email: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/forgot-password`, null, {
      params: { email }
    });  
  }

  updateUser(userId: string, user: UserRecord): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }
  

}