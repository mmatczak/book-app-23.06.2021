import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book | undefined;

  @Output()
  bookChange: EventEmitter<Book> = new EventEmitter<Book>();

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const author = authorElement?.value ?? '';
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const title = titleElement?.value ?? '';
    const updatedBook: Book = {id: this.book?.id!, author, title};
    this.bookChange.emit(updatedBook);
  }
}
