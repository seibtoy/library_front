import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-item-cart',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartItemComponent {
  @Input() item: any;
  @Output() quantityChanged = new EventEmitter<number>();
  @Output() itemUpdated = new EventEmitter<any>();
  @Output() itemRemoved = new EventEmitter<any>();

  constructor(private cartService: CartService) {}
  private updateDelay: number = 500;
  private updateTimer: any;

  ngOnInit(): void {}

  increment(): void {
    this.item.weeks++;
    this.startUpdateTimer();
  }

  decrement(): void {
    if (this.item.weeks > 1) {
      this.item.weeks--;
      this.startUpdateTimer();
    }
  }

  removeFromCart(): void {
    this.cartService.onItemRemoved(this.item.bookId._id);
  }

  private startUpdateTimer() {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }

    this.updateTimer = setTimeout(() => {
      this.cartService.updateItemWeeks(this.item);
    }, this.updateDelay);
  }
}
