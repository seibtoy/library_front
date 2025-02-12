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
      console.log('Форма отправлена', this.registrationForm.value);
    }
  }
}
