import { Component } from '@angular/core';
import { BorrowedComponent } from '../../components/borrowed/borrowed.component';

@Component({
  selector: 'app-root',
  imports: [BorrowedComponent],
  templateUrl: './borrowed-page.component.html',
  styleUrl: './borrowed-page.component.scss',
})
export class BorrowedPageComponent {
  title = 'library-app';
}
