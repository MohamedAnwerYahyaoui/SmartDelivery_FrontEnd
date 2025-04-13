import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user-dto';
import { UserServiceService } from '../services/users/user-service.service';
import { RoleService } from '../services/roles/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];
  searchTerm = '';
  selectedRole = '';
  currentPage = 0;
  pageSize = 5;
  allRoles: string[] = []; // Initialize empty array

  errorMessage = '';

  constructor(
    private userService: UserServiceService,
    private roleService: RoleService // Inject RoleService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadRoles(); // Add role loading
  }

  // Add this method to load roles
  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.allRoles = roles.map(role => role.name);
      },
      error: (err) => {
        console.error('Failed to load roles:', err);
        this.errorMessage = 'Failed to load roles';
      }
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => 
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedRole ? user.roles.includes(this.selectedRole) : true)
    );
    this.currentPage = 0;
  }

  get paginatedUsers() {
    const start = this.currentPage * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  selectedUser: string = '';

  showConfirmModal(userName: string) {
    this.selectedUser = userName;
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  closeModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  confirmDelete() {
    if (this.selectedUser) {
      this.userService.deleteUser(this.selectedUser).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: () => this.errorMessage = 'Failed to deactivate  user'
      });
    }
  }

  
  
  

}