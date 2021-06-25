import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

export class BookService {
  private idSeq = 0;
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
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

  saveNew(newBookProps: BookProperties): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const newBook: Book = {...newBookProps, id: this.idSeq++};
      const currentBooks = this.booksSubject.getValue();
      const newBooks = [...currentBooks, newBook];
      this.booksSubject.next(newBooks);
      subscriber.next(newBook);
      subscriber.complete();
    });
  }

  getOne(id: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === id);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(`Could not find book with ID: ${id}`);
      }
    });
  }

  search(query: string): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
        let results: Book[];
        const currentBooks = this.booksSubject.getValue();
        if (query) {
          const queryLowerCase = query.toLocaleLowerCase();
          results = currentBooks.filter(book => book.author.toLocaleLowerCase().includes(queryLowerCase)
            || book.title.toLocaleLowerCase().includes(queryLowerCase));
        } else {
          results = currentBooks;
        }
        subscriber.next(results);
        subscriber.complete();
    });
  }
}

