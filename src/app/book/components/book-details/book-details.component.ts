import {Component} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  readonly book: Book;

  constructor() {
    this.book = {
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    };
  }
}
