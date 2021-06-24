import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {BookService} from '../../services/book.service';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private readonly books: BookService, private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(+bookId);
      }
    }
    setTimeout(() => this.router.navigateByUrl('/book/new'));
    return throwError(`Book ID: ${bookIdAsString} could not be parsed`);
  }
}
