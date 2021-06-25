import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {fromEvent, Observable, OperatorFunction, merge} from 'rxjs';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  searchFormControl : FormControl;
  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly router: Router) {
    this.searchFormControl = new FormControl();

    const booksFromSearch$ = this.searchFormControl.valueChanges
      .pipe(
        filter(value => value.length >= 3),
        distinctUntilChanged(),
        debounceTime(500),
        searchForResultsUsing(this.bookService),
        map(books=> books as Book[])
      );
    this.books$ = merge(this.bookService.findAll(), booksFromSearch$);
  }

  goToDetails(book: Book): void {
    this.router.navigate(['book', book.id]);
  }
}

function searchForResultsUsing(bookService: BookService): OperatorFunction<string, unknown> {
  return switchMap(query => bookService.search(query));
}

