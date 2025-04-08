import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentification/services/auth.service';

@Component({
  selector: 'app-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: ['./dashboard-nav-bar.component.css']
})
export class DashboardNavBarComponent {

  username: string | null = null;
  constructor(private authService: AuthService) {
    this.username = authService.getUsername();
  }

  onLogout() {
    this.authService.logout();
  }

  

  

 

}