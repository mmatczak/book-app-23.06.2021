import {Book} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 0,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: 2,
      author: 'Robert C. Martin',
      title: 'Clean Code'
    }
  ]);

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  save(bookToSave: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToSave};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = currentBooks.map(book => bookToSave.id === book.id ? bookCopy : book);
      this.booksSubject.next(newBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }
}

