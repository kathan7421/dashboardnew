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
  registerForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(isLogin: boolean) {
    this.loading = true;
    let email, password, name; // Declaring variables here

    if (isLogin) {
      // Login form submitted
      if (this.loginForm.invalid) {
        this.loading = false;
        return;
      }
      email = this.loginForm.value.email;
      password = this.loginForm.value.password;
    } else {
      // Registration form submitted
      if (this.registerForm.invalid) {
        this.loading = false;
        return;
      }
      email = this.registerForm.value.email;
      password = this.registerForm.value.password;
      name = this.registerForm.value.name;
    }

    // Now use these variables accordingly
    if (isLogin) {
      this.authService.login(email, password)
        .subscribe(
          response => {
            if (response.user && response.user.token) {
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              this.toastr.success('Login successful', 'Welcome');
              this.authService.currentUserValue = response;
              this.router.navigate(['/dashboard']);
            } else {
              this.toastr.error('Oops! Something went wrong.', 'Error');
            }
            this.loading = false;
          },
          error => {
            const errorMessage = error.error.error || 'An error occurred during login';
            this.toastr.error(errorMessage, 'Error');
            this.loading = false;
          }
        );
    } else {
      this.authService.register(name, email, password)
        .subscribe(
          user => {
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.toastr.success('Registration successful', 'Welcome');
              this.authService.currentUserValue = user;
              this.router.navigate(['/login']);
            } else {
              this.toastr.error('Oops! Something went wrong.', 'Error');
            }
            this.loading = false;
          },
          error => {
            const errorMessage = error.error.error || 'An error occurred during registration';
            this.toastr.error(errorMessage, 'Error');
            this.loading = false;
          }
        );
    }
  }
}
