import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleRecord } from '../../models/role-record';
import { catchError, Observable } from 'rxjs';
import { RoleDTO } from '../../models/role-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = 'http://localhost:8066/auth/roles';

  constructor(private http: HttpClient) { }

  createRole(role: RoleRecord): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, role);
  }

  getAllRoles(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(`${this.apiUrl}/all`);
  }

  deleteRole(roleName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${roleName}`);
  }

  getRoleById(roleId: string) {
    return this.http.get<RoleDTO>(`${this.apiUrl}/id/${roleId}`);
  }

  updateRole(originalRoleName: string, role: RoleRecord): Observable<any> {
    return this.http.put(`${this.apiUrl}/${originalRoleName}`, role);
  }


  getRoleByName(roleName: string): Observable<RoleDTO> {
    return this.http.get<RoleDTO>(`${this.apiUrl}/role/${roleName}`);
  }
  

  assignRole(userId: string, roleName: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/assign/users/${userId}`,
      null,
      { params: { roleName } }
    ).pipe(
      catchError((error) => {
        throw new Error(error.error || 'Failed to assign role');
      })
    );
  }

  unassignRole(userId: string, roleName: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/remove/users/${userId}`,
      { params: { roleName } }
    ).pipe(
      catchError((error) => {
        throw new Error(error.error || 'Failed to remove role');
      })
    );
  }
  
  
}