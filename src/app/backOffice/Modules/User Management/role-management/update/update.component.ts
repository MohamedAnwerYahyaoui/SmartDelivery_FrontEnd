import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/roles/role.service';
import { RoleRecord } from '../../models/role-record';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 
  roleForm: FormGroup;
  originalRoleName!: string;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.originalRoleName = this.route.snapshot.paramMap.get('name')!;
    
    this.roleService.getRoleByName(this.originalRoleName).subscribe({
      next: (role) => {
        this.roleForm.patchValue({
          roleName: role.name,
          description: role.description
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load role details';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) return;

    const updatedRole: RoleRecord = {
      roleName: this.roleForm.value.roleName,
      description: this.roleForm.value.description
    };

    this.roleService.updateRole(this.originalRoleName, updatedRole).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/user/rolesList']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to update role. Please try again.';
        console.error('Update error:', err);
      }
    });
  }

}