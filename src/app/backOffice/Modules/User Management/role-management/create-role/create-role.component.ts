import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../services/roles/role.service';
import { Router } from '@angular/router';
import { RoleRecord } from '../../models/role-record';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {

  roleForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) return;

    const roleRecord: RoleRecord = {
      roleName: this.roleForm.value.roleName,
      description: this.roleForm.value.description
    };

    this.roleService.createRole(roleRecord).subscribe({
      next: () => this.router.navigate(['/dashboard/user/rolesList']),
      error: (err) => {
        this.errorMessage = 'Error creating role. Please try again.';
        console.error('Creation error:', err);
      }
    });
  }
}