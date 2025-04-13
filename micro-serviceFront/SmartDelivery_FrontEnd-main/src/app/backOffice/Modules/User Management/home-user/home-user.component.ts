import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RoleService } from '../services/roles/role.service';
import { UserServiceService } from '../services/users/user-service.service';
import { AuthService } from 'src/app/authentification/services/auth.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {
  today: Date = new Date();
  username: string | null = null;
    constructor(private authService: AuthService) {
      this.username = authService.getUsername();
    }
 
}