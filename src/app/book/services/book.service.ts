import {Book} from '../model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
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
  ];

  findAll(): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.books);
        subscriber.complete();
      }, 2000);
    });
  }
}
