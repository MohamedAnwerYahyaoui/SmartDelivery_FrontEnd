import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/backOffice/Modules/User Management/services/users/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  clientForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    
  }

  onClientSubmit() {
    if (this.clientForm.invalid) return;

    const formData = {
      ...this.clientForm.value,
      roles: ['client'] // Automatically add client role
    };

    this.userService.createClientAccount(formData).subscribe({
      next: () => this.router.navigate(['/welcome']),
      error: (err) => console.error('Account creation failed:', err)
    });
  }

}
