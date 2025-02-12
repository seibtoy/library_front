import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/Header/header.component';
import { FooterComponent } from '../../components/Footer/footer.component';
import { MainComponent } from '../../components/Main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  title = 'library-app';
}
