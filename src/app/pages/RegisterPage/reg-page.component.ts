import { Component } from '@angular/core';
import { RegistrationComponent } from '../../components/registration/registration.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RegistrationComponent],
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.scss',
})
export class RegisterPageComponent {
  title = 'library-app';
}
