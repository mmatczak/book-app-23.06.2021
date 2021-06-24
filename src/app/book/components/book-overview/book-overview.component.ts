import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnDestroy {
  readonly books$: Observable<Book[]>;
  selectedBook: Book | undefined;
  private readonly subscriptions: Subscription[] = [];

  constructor(private readonly bookService: BookService) {
    this.books$ = this.bookService.findAll();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBooksWith(updatedBook: Book): void {
    const subscription = this.bookService.save(updatedBook)
      .subscribe((updatedBook) => {
        this.selectedBook = updatedBook;
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
