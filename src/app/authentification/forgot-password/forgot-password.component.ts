import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/backOffice/Modules/User Management/services/users/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: UserServiceService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const email = this.forgotPasswordForm.value.email;

    this.forgotPasswordService.sendResetLink(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Password reset link sent successfully!';
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000); // Redirect after 3 seconds
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to send reset link. Please try again.';
        console.error('Error sending reset link:', err);
      }
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

}