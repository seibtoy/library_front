import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PenaltyComponent } from '../penalty/penalty.component';

@Component({
  selector: 'app-borrowed',
  imports: [CommonModule, PenaltyComponent],
  templateUrl: './borrowed.component.html',
  styleUrl: './borrowed.component.scss',
})
export class BorrowedComponent implements OnInit {
  borrowedBooks: any[] = [];
  isPenalty: boolean = false;
  selectedBook: any;
  borrowedBook: any;

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

  stopRental(
    borrowedBookId: string,
    bookId: string,
    userId: string,
    depositPrice: number,
    clientPaid: number,
    refundAmount: number
  ): void {
    const token = sessionStorage.getItem('token');
    this.http
      .post(
        'http://localhost:5000/rental-stop',
        {
          borrowedBookId,
          bookId,
          userId,
          depositPrice,
          clientPaid,
          refundAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
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
            this.borrowedBooks[index].books = this.borrowedBooks[
              index
            ].books.filter((book: any) => book.bookId._id !== bookId);
          }
          this.togglePenalty();
        },
        error: (error) => {
          console.error('Error stopping rental:', error);
        },
      });
  }
  togglePenalty(book?: any, borrowed?: any): void {
    this.isPenalty = !this.isPenalty;
    document.body.classList.toggle('no-scroll');

    if (book && borrowed) {
      this.selectedBook = book;
      this.borrowedBook = borrowed;
    } else {
      this.selectedBook = null;
      this.borrowedBook = null;
    }
  }
}
