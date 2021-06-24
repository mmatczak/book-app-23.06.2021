import {Component} from '@angular/core';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly router: Router) {
    this.books$ = this.bookService.findAll();
  }

  goToDetails(book: Book): void {
    this.router.navigate(['book', book.id]);
  }
}
