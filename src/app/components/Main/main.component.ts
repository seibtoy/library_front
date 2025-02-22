import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from './../../services/book.service';
import { Book } from '../../models/book.model';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, CommonModule, ModalWindowComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  genres = [
    'Biography',
    'Fiction',
    'Novel',
    'History',
    'Mystery',
    'Politics & Current Affairs',
    'Religion',
  ];

  books: Book[] = [];
  displayedBooks: Book[] = [];
  selectedGenre: string | null = null;
  booksToShow = 24;
  modalTitle = '';
  modalContent = '';
  isHeartSolid = false;
  addedBooks: Set<string> = new Set();

  constructor(
    private bookService: BookService,
    private authservice: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data.map((book) => ({
        ...book,
        isLiked: false,
      }));
      this.displayedBooks = this.books.slice(0, this.booksToShow);
      this.genres = Array.from(new Set(this.books.map((book) => book.genre)));
    });
  }

  showMore(): void {
    const newLength = this.displayedBooks.length + this.booksToShow;

    this.displayedBooks = this.books.slice(0, newLength);

    if (this.displayedBooks.length >= this.books.length) {
      this.booksToShow = 0;
    }
  }

  filterBooksByGenre(genre: string): void {
    this.selectedGenre = genre;

    if (genre === 'Sale') {
      this.displayedBooks = this.books.slice(0, this.booksToShow);
    } else {
      this.displayedBooks = this.books
        .filter((book) => book.genre === genre)
        .slice(0, this.booksToShow);
    }
  }

  saveCartToDatabase(book: any): void {
    const token = sessionStorage.getItem('token');
    const cartData = {
      bookId: book._id,
      weeks: 1,
    };

    fetch(`http://localhost:5000/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(() => {
        this.addedBooks.add(book._id);
        this.cartService.loadCart();
      })
      .catch((error) => {
        console.error('Error saving cart:', error);
      });
  }
  isBookInCart(bookId: string): boolean {
    return this.addedBooks.has(bookId);
  }

  toggleHeart(index: number) {
    this.displayedBooks[index].isLiked = !this.displayedBooks[index].isLiked;
  }

  @ViewChild(ModalWindowComponent) modal!: ModalWindowComponent;

  openModal(title: string, content: string): void {
    this.modalTitle = title;
    this.modalContent = content;

    setTimeout(() => {
      this.modal.openModal();
    }, 0);
  }

  handleBookBtnClick(book: any): void {
    if (!this.authservice.isLoggedIn()) {
      alert('Please log in or create an account before using cart');
    } else {
      this.authservice.isLoggedIn();
      this.saveCartToDatabase(book);
    }
  }
}
