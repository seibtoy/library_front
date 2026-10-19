import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FinancialsComponent } from '../../components/financials/financials.component';

@Component({
  selector: 'app-financials-page',
  imports: [FinancialsComponent],
  templateUrl: './financials-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './financials-page.component.scss',
})
export class FinancialsPageComponent {
  title = 'library-app';
}
