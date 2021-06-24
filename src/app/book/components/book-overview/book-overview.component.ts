import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy {
  books: Book[] | undefined;
  selectedBook: Book | undefined;
  private readonly subscription: Subscription;

  constructor(books: BookService) {
    this.subscription = books.findAll().subscribe(books => this.books = books);
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksWith(updatedBook: Book): void {
    this.books = this.books?.map(book => updatedBook.id === book.id ? updatedBook : book);
    this.selectedBook = updatedBook;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
