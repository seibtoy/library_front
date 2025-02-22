import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borrowed',
  imports: [CommonModule],
  templateUrl: './borrowed.component.html',
  styleUrl: './borrowed.component.scss',
})
export class BorrowedComponent implements OnInit {
  borrowedBooks: any[] = [];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.getUserBorrowedBooks().subscribe({
      next: (data) => {
        this.borrowedBooks = data;
      },
      error: (err) => {
        console.error('Error fetching borrowed books', err);
      },
    });
  }

  stopRental(borrowedBookId: string, bookId: string): void {
    const token = sessionStorage.getItem('token');
    this.http
      .post(
        'http://localhost:5000/stop-rental',
        { borrowedBookId, bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .subscribe({
        next: (response: any) => {
          const index = this.borrowedBooks.findIndex(
            (book) => book._id === borrowedBookId
          );
          if (index !== -1) {
            // Обновляем только books внутри borrowedBook
            this.borrowedBooks[index].books = this.borrowedBooks[
              index
            ].books.filter((book: any) => book.bookId._id !== bookId);
          }
        },
        error: (error) => {
          console.error('Error stopping rental:', error);
        },
      });
  }
}
