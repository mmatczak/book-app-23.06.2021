import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {fromEvent, Observable, OperatorFunction} from 'rxjs';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('searchInput')
  searchInputElement: ElementRef | undefined;

  readonly books$: Observable<Book[]>;

  private timeoutHandle: number | null = null;

  constructor(private readonly bookService: BookService, private readonly router: Router) {
    this.books$ = this.bookService.findAll();
  }

  goToDetails(book: Book): void {
    this.router.navigate(['book', book.id]);
  }

  logIt($event: Event) {
    const input = $event.target as HTMLInputElement;
    console.log(input.value);
  }

  ngAfterViewInit(): void {
    const inputElement = this.searchInputElement?.nativeElement as HTMLInputElement;
    // inputElement.addEventListener('input', event => {
    //   const input = event.target as HTMLInputElement;
    //   if (this.timeoutHandle) {
    //     clearTimeout(this.timeoutHandle);
    //   }
    //   this.timeoutHandle = setTimeout(() => {
    //     console.log(input.value);
    //   }, 500);
    // });


    fromEvent(inputElement, 'input')
      .pipe(
        mapFromEventToTargetValue(),
        distinctUntilChanged(),
        debounceTime(500),
        // this.searchForResults()
        searchForResultsUsing(this.bookService)
      )
      .subscribe(books => {
          (books as Book[]).forEach(book => console.log(book));
        }
      );
  }

  searchForResults(): OperatorFunction<string, unknown> {
    return switchMap(query => this.bookService.search(query));
  }
}

function mapFromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const input = event.target as HTMLInputElement;
    return input.value;
  });
}

function searchForResultsUsing(bookService: BookService): OperatorFunction<string, unknown> {
  return switchMap(query => bookService.search(query));
}

