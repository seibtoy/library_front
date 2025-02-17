import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/loginResponse.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginisation',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './loginisation.component.html',
  styleUrl: './loginisation.component.scss',
})
export class LoginisationComponent {
  constructor(private http: HttpClient, private authService: AuthService) {}

  formFields = [
    {
      controlName: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: 'Your phone',
    },
    {
      controlName: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Your password',
    },
  ];

  loginForm = new FormGroup({
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\+?[0-9]{10,15}$/),
      ],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http
        .post<LoginResponse>('http://127.0.0.1:5000/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.authService.login(response.token);
            alert('Login successfull');
          },
          error: (err) => {
            console.error('Error', err);
            alert('Login failed');
          },
        });

      console.log('Form sent', this.loginForm.value);
    }
  }
}
