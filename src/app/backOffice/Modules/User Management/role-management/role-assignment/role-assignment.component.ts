import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleDTO } from '../../models/role-dto';
import { UserDTO } from '../../models/user-dto';
import { UserServiceService } from '../../services/users/user-service.service';
import { RoleService } from '../../services/roles/role.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-role-assignment',
  templateUrl: './role-assignment.component.html',
  styleUrls: ['./role-assignment.component.css']
})
export class RoleAssignmentComponent implements OnInit{

  roleForm: FormGroup;
  users: UserDTO[] = [];
  roles: RoleDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private roleService: RoleService,
    private notificationService: NotificationService
  ) {
    this.roleForm = this.fb.group({
      userId: ['', Validators.required],
      roleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => this.notificationService.showError('Failed to load users')
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => this.notificationService.showError('Failed to load roles')
    });
  }

  assignRole(): void {
    if (this.roleForm.valid) {
      const { userId, roleName } = this.roleForm.value;
      this.roleService.assignRole(userId, roleName).subscribe({
        next: () => {
          this.notificationService.showSuccess('Role assigned successfully');
          this.roleForm.reset();
        },
        error: (err) => this.notificationService.showError(err.message)
      });
    }
  }

  unassignRole(): void {
    if (this.roleForm.valid) {
      const { userId, roleName } = this.roleForm.value;
      this.roleService.unassignRole(userId, roleName).subscribe({
        next: () => {
          this.notificationService.showSuccess('Role removed successfully');
          this.roleForm.reset();
        },
        error: (err) => this.notificationService.showError(err.message)
      });
    }
  }
 

  
}