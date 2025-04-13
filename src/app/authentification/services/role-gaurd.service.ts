import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGaurdService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    const hasRole = requiredRoles.some(role => this.authService.hasRole(role));

    if (hasRole) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
      return false;
    }
  }
}