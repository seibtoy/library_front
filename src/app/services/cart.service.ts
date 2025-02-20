import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItemsSource.asObservable();

  constructor(private http: HttpClient) {}

  loadCart(): void {
    const token = sessionStorage.getItem('token');
    this.http
      .get<any[]>('http://localhost:5000/get-cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.cartItemsSource.next(data);
        },
        error: (error) => {
          console.error('Error fetching cart:', error);
        },
      });
  }

  onItemRemoved(bookId: string): void {
    const token = sessionStorage.getItem('token');

    this.http
      .post(
        'http://localhost:5000/remove-cart',
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe({
        next: (response) => {
          console.log('Item removed from cart:', response);
          this.loadCart();
        },
        error: (error) => {
          console.error('Error removing item from cart:', error);
        },
      });
  }

  updateItemWeeks(item: any): void {
    const token = sessionStorage.getItem('token');
    this.http
      .post(
        'http://localhost:5000/update-weeks-cart',
        { bookId: item.bookId._id, weeks: item.weeks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe({
        next: (response) => {
          console.log('Cart item updated:', response);
        },
        error: (error) => {
          console.error('Error updating cart item:', error);
        },
      });
  }
}
