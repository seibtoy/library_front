import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penalty',
  imports: [CommonModule],
  templateUrl: './penalty.component.html',
  styleUrl: './penalty.component.scss',
})
export class PenaltyComponent implements OnChanges {
  @Input() isPenalty: boolean = false;
  @Input() selectedBook: any;
  @Input() borrowedBook: any;
  @Input() userId: any;
  @Output() isPenaltyChange = new EventEmitter<boolean>();
  @Output() stopRentalEvent = new EventEmitter<{
    borrowedBookId: string;
    bookId: string;
    userId: string;
    depositPrice: number;
    clientPaid: number;
    refundAmount: number;
  }>();

  refundAmount: number = 0;
  penalties: { [key: string]: boolean } = {
    physicalDamage: false,
    pollution: false,
    waterDamage: false,
    insectsAnimals: false,
    mechanicalDefects: false,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBook'] && changes['selectedBook'].currentValue) {
      const deposit = this.selectedBook.bookId?.depositPrice || 0;
      this.refundAmount = deposit;

      Object.keys(this.penalties).forEach(
        (key) => (this.penalties[key] = false)
      );
    }
  }

  togglePenalty(): void {
    this.isPenalty = !this.isPenalty;
    this.isPenaltyChange.emit(this.isPenalty);
    document.body.classList.toggle('no-scroll');
  }

  calculateRefund(): void {
    if (
      this.selectedBook &&
      this.selectedBook.bookId &&
      this.selectedBook.bookId.depositPrice
    ) {
      this.refundAmount = this.selectedBook.bookId.depositPrice;
    } else {
      this.refundAmount = 0;
    }
  }

  updateRefund(penaltyType: string, event: any): void {
    const damagePercentage = 0.1;
    this.penalties[penaltyType] = event.target.checked;

    const totalDamage =
      Object.values(this.penalties).filter((active) => active).length *
      damagePercentage;

    this.refundAmount =
      this.selectedBook.bookId.depositPrice * (1 - totalDamage);
    this.refundAmount = parseFloat(this.refundAmount.toFixed(2));
  }

  stopRental(): void {
    if (
      this.selectedBook &&
      this.selectedBook._id &&
      this.selectedBook.bookId._id
    ) {
      this.stopRentalEvent.emit({
        borrowedBookId: this.borrowedBook._id,
        bookId: this.selectedBook.bookId._id,
        userId: this.userId,
        depositPrice: this.selectedBook.bookId.depositPrice,
        clientPaid:
          this.selectedBook.bookId.rentalPrice * this.selectedBook.weeks +
          this.selectedBook.bookId.depositPrice,
        refundAmount: this.refundAmount,
      });
    }
  }
}
