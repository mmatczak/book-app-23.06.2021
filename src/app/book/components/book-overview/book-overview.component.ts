import {Component} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books: Book[];
  selectedBook: Book | undefined;

  constructor() {
    this.books = [
      {
        author: 'Marek Matczak',
        title: 'Angular for nerds'
      },
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        author: 'Robert C. Martin',
        title: 'Clean Code'
      }
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }
}
