import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signinForm: FormGroup;
  errorMessage: string = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signinForm.valid) {
      const { username, password } = this.signinForm.value;
      
      this.authService.login(username, password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          this.errorMessage = 'Invalid username or password';
          console.error('Login error:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}