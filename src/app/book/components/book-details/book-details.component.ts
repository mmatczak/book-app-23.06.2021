import {Component} from '@angular/core';
import {Book, BookProperties} from '../../model';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: Book | undefined;

  constructor(
    private readonly books: BookService,
    route: ActivatedRoute,
    private readonly router: Router) {
    this.book = route.snapshot.data.book;
  }

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value ?? '';
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value ?? '';
    if (this.book) { // edit existing
      const updatedBook: Book = {id: this.book.id, author, title};
      this.books.save(updatedBook).subscribe(() => this.router.navigateByUrl('/books'))
    } else { // new book
      const bookProps: BookProperties = {author, title};
      this.books.saveNew(bookProps).subscribe(() => this.router.navigateByUrl('/books'))
    }
  }
}
