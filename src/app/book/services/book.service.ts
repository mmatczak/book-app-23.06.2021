import {Book, BookProperties} from '../model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class BookService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('/api/books');
  }

  save(bookToSave: Book): Observable<Book> {
    return this.httpClient.put<Book>(`/api/books/${bookToSave.id}`, bookToSave);
  }

  saveNew(newBookProps: BookProperties): Observable<Book> {
    return this.httpClient.post<Book>(`/api/books`, newBookProps);
  }

  getOne(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`/api/books/${id}`);
  }

  search(query: string): Observable<Book[]> {

    const params: HttpParams = new HttpParams({
      fromObject: {
        "author.firstname_like": `${query}`
      }
    });
    return this.httpClient.get<Book[]>('/api/books', {params})
      .pipe(catchError(()=> of([])));
  }
}

