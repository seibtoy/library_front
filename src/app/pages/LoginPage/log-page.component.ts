import { Component } from '@angular/core';
import { LoginisationComponent } from '../../components/loginisation/loginisation.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [LoginisationComponent],
  templateUrl: './log-page.component.html',
  styleUrl: './log-page.component.scss',
})
export class LoginPageComponent {
  title = 'library-app';
}
