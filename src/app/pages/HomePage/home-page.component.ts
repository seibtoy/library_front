import { Component } from '@angular/core';
import { MainComponent } from '../../components/Main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [MainComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  title = 'library-app';
}
