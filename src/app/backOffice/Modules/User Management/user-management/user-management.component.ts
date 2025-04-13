import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user-dto';
import { RoleDTO } from '../models/role-dto';
import { UserServiceService } from '../services/users/user-service.service';
import { RoleService } from '../services/roles/role.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  today: Date = new Date();
  // Core Statistics
   totalUsersCh = 0;
   totalRolesCh = 0;
 
  
 
   loading = true;
   errorMessageCh = '';

 
  users: UserDTO[] = [];
  roles: RoleDTO[] = [];
  
  // Stats properties
  totalUsers: number = 0;
  totalRoles: number = 0;
  recentUsers: UserDTO[] = [];
  
  // UI state properties
  isLoading: boolean = true;
  errorMessage: string = '';
  
  // Mock data for charts (replace with real implementation)
  chartData = {
    userGrowth: [],
    roleDistribution: []
  };

  constructor(
    private userService: UserServiceService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.loadDataCh();
    this.loadData();
  }

  private loadDataCh() {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.totalUsersCh = users.length;
       
        this.loading = false;
      },
      error: err => this.handleErrorCh(err)
    });

    this.roleService.getAllRoles().subscribe({
      next: roles => {
        this.totalRolesCh = roles.length;
        
        this.loading = false;
      },
      error: err => this.handleErrorCh(err)
    });
  }

 

  private handleErrorCh(error: any) {
    this.errorMessageCh = 'Failed to load dashboard data';
    this.loading = false;
    console.error(error);
  }

  private loadData(): void {
    this.isLoading = true;
    
    // Load users and roles in parallel
    forkJoin([
      this.userService.getAllUsers(),
      this.roleService.getAllRoles()
    ]).subscribe({
      next: ([users, roles]) => {
        this.users = users;
        this.roles = roles;
        this.processData();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dashboard data';
        this.isLoading = false;
        console.error('Dashboard load error:', err);
      }
    });
  }

  private processData(): void {
    // Calculate totals
    this.totalUsers = this.users.length;
    this.totalRoles = this.roles.length;

    // Get recent users (last 5 created)
    this.recentUsers = this.users
      
      .slice(0, 5);

    // Process chart data (implement your chart logic here)
    this.processChartData();
  }

  private processChartData(): void {
    // Implement your chart data processing logic here
    // Example for role distribution:
    this.roles.map(role => ({
      name: role.name,
      value: this.getRoleUserCount(role.name)
    }));
  }

  // Helper methods for template
  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  }

  getRoleUserCount(roleName: string): number {
    return this.users.filter(user => 
      user.roles.includes(roleName)
    ).length;
  }

  // Add these methods if you need to format dates
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
  
}