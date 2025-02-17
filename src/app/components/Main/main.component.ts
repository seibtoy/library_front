import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from './../../services/book.service';
import { Book } from '../../models/book.model';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private bookService: BookService,
    private authservice: AuthService
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

  isHeartSolid = false;

  toggleHeart(index: number) {
    this.displayedBooks[index].isLiked = !this.displayedBooks[index].isLiked;
  }

  modalTitle = '';
  modalContent = '';

  @ViewChild(ModalWindowComponent) modal!: ModalWindowComponent;

  openModal(title: string, content: string): void {
    this.modalTitle = title;
    this.modalContent = content;

    setTimeout(() => {
      this.modal.openModal();
    }, 0);
  }

  onCloseModal(): void {}

  handleBookBtnClick(): void {
    if (!this.authservice.isLoggedIn()) {
      this.openModal('Oops!', 'Seems like you are not logged in');
    } else {
      this.authservice.isLoggedIn();
      alert('Hello');
    }
  }
}
