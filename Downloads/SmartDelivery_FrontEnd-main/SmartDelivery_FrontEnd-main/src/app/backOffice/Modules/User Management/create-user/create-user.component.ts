import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/users/user-service.service';
import { Router } from '@angular/router';
import { RoleService } from '../services/roles/role.service';
import { RoleDTO } from '../models/role-dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  userForm: FormGroup;
  roles: RoleDTO[] = []; // Dynamic roles from API
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private roleService: RoleService, // Inject RoleService
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: [[]] // Initialize with empty array
    });
  }

  ngOnInit(): void {
    this.loadRoles(); // Fetch roles when component initializes
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles; // Assign fetched roles to the roles array
      },
      error: (err) => {
        console.error('Failed to load roles:', err);
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    // Map selected role names to role objects if needed
    const formValue = {
      ...this.userForm.value,
      roles: this.userForm.value.roles // Already an array of role names
    };

    this.userService.createUser(formValue).subscribe({
      next: () => this.router.navigate(['/dashboard/user/usersList']),
      error: (err) => console.error('Error creating user:', err)
    });
  }

}