import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrowed',
  imports: [CommonModule],
  templateUrl: './borrowed.component.html',
  styleUrl: './borrowed.component.scss',
})
export class BorrowedComponent {
  borrowedBooks: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getUserBorrowedBooks().subscribe({
      next: (data) => {
        this.borrowedBooks = data.flatMap((order: any) => order.books || []);
      },
      error: (err) => {
        console.error('Error fetching borrowed books', err);
      },
    });
  }
}
