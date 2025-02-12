import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from './../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
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
    'Sale',
  ];

  books: Book[] = [];
  displayedBooks: Book[] = [];
  booksToShow = 24;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.displayedBooks = this.books.slice(0, this.booksToShow);
    });
  }

  showMore(): void {
    const newLength = this.displayedBooks.length + this.booksToShow;

    this.displayedBooks = this.books.slice(0, newLength);

    if (this.displayedBooks.length >= this.books.length) {
      this.booksToShow = 0;
    }
  }
}
