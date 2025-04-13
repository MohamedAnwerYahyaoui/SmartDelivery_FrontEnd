import { Component, OnInit } from '@angular/core';
import { RoleDTO } from '../../models/role-dto';
import { RoleService } from '../../services/roles/role.service';
import { RoleRecord } from '../../models/role-record';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: RoleDTO[] = [];
  loading = true;
  errorMessage = '';

  
  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load roles';
        this.loading = false;
      }
    });
  }

  selectedRole: string = '';

showConfirmModal(roleName: string) {
  this.selectedRole = roleName;
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
  if (this.selectedRole) {
    this.roleService.deleteRole(this.selectedRole).subscribe({
      next: () => {
        this.loadRoles();
        this.closeModal();
      },
      error: () => this.errorMessage = 'Failed to delete role'
    });
  }
}





}