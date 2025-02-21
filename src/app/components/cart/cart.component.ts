import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item-component/cart-item.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatRadioModule,
    CartItemComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit {
  @Input() isCartOpen: boolean = false;
  @Output() isCartOpenChange = new EventEmitter<boolean>();

  cartItems: any[] = [];
  isDiscountBlockVisible: boolean = false;
  selectedDiscount: number = 0;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
    this.cartService.loadCart();
  }

  onDiscountChange(discount: number): void {
    this.selectedDiscount = discount;
    sessionStorage.setItem(
      'selectedDiscount',
      this.selectedDiscount.toString()
    );
  }

  getTotal(): string {
    const total = this.cartItems.reduce((sum, item) => {
      return (
        sum + (item.bookId.depositPrice + item.bookId.rentalPrice * item.weeks)
      );
    }, 0);

    const discountedTotal = total - (total * this.selectedDiscount) / 100;

    return discountedTotal.toFixed(2);
  }

  toggleDiscountBlock(): void {
    this.isDiscountBlockVisible = !this.isDiscountBlockVisible;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    this.isCartOpenChange.emit(this.isCartOpen);
    document.body.classList.toggle('no-scroll');
  }

  placeOrder(): void {
    const token = sessionStorage.getItem('token');
    const cartData = {
      books: this.cartItems.map((item) => ({
        bookId: item.bookId._id,
        weeks: item.week,
      })),
      totalPrice: this.getTotal(),
      weeks: this.cartItems[0]?.week || 0,
    };

    this.http
      .post('http://localhost:5000/place-order', cartData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (response) => {
          this.cartItems = [];
        },
        error: (error) => {
          console.error('Error placing order:', error);
        },
      });
  }
}
