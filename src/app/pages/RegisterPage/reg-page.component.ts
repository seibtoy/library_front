import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RegistrationComponent } from '../../components/registration/registration.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RegistrationComponent],
  templateUrl: './reg-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './reg-page.component.scss',
})
export class RegisterPageComponent {
  title = 'library-app';
}
