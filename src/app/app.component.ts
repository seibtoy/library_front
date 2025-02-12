import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/header.component';
import { FooterComponent } from './components/Footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'library-app';
}
