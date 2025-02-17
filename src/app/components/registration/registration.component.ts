import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  constructor(private http: HttpClient, private authservice: AuthService) {}

  formFields = [
    {
      controlName: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Your name',
    },
    {
      controlName: 'surname',
      label: 'Surname',
      type: 'text',
      placeholder: 'Your surname',
    },
    {
      controlName: 'midname',
      label: 'Middle name',
      type: 'text',
      placeholder: 'Your midname',
    },
    {
      controlName: 'phone',
      label: 'Phone',
      type: 'text',
      placeholder: 'Your phone',
    },
    {
      controlName: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Your address',
    },
    {
      controlName: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Your password',
    },
    {
      controlName: 'passwordConfirm',
      label: 'Confirm password',
      type: 'password',
      placeholder: 'Your confirmed password',
    },
  ];

  registrationForm = new FormGroup(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      surname: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      midname: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      address: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
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
      passwordConfirm: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

      const { passwordConfirm, ...dataToSend } = userData;

      this.http
        .post('http://127.0.0.1:5000/register', dataToSend, {

          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            console.log('Success registratin', response);
            alert('Success registration');
          },
          error: (error) => {
            console.error('Error: ', error);
            alert('error registration');
          },
        });

      console.log('Form sent ', this.registrationForm.value);
    }
  }
}
