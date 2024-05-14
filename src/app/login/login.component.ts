import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe(
        response => {
          if (response.user && response.user.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Oops! Something went wrong.', 'Error');
            this.loading = false;
          }
        },
        error => {
          // Display error message from the server if available, otherwise show a generic error
          const errorMessage = error.error.error || 'An error occurred during login';
          this.toastr.error(errorMessage, 'Error');
          this.loading = false;
        }
      );
  }
}  