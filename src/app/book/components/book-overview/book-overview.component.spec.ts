import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {BookService} from '../../services/book.service';
import {of} from 'rxjs';
import {Book} from '../../model';
import {BookDetailsComponent} from '../book-details/book-details.component';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;
  let element: HTMLElement;
  let testBook: Book, testAuthor: string, testTitle: string;
  let bookServiceMock: any;

  beforeEach(() => {
    testAuthor = 'Test author';
    testTitle = 'Test title';
    testBook = {id: 0, title: testTitle, author: testAuthor}
    bookServiceMock = {
      findAll() {
        return of([testBook]);
      }
    }

    return TestBed.configureTestingModule({
      declarations: [BookOverviewComponent, BookDetailsComponent],
      providers: [{provide: BookService, useValue: bookServiceMock}],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
  });

  it('shows list of books', () => {
    // when
    fixture.detectChanges();
    // then
    const tableRowElements = element.querySelectorAll<HTMLTableRowElement>('table > tbody > tr');
    expect(tableRowElements.length).toBe(1);
    const row = tableRowElements[0] as HTMLTableRowElement;
    const cells = row.querySelectorAll('td');
    expect(cells.length).toBe(2);
    const author = cells[0].textContent;
    expect(author).toBe(testAuthor);
  });

  it('shows book details on row click', () => {
    // given
    fixture.detectChanges();
    const tableRowElements = element.querySelectorAll<HTMLTableRowElement>('table > tbody > tr');
    if (tableRowElements.length !== 1) {
      fail();
    }
    const row = tableRowElements[0] as HTMLTableRowElement;
    // when
    row.click();
    fixture.detectChanges();
    // then
    const bookDetailsElement = element.querySelector('ba-book-details');
    expect(bookDetailsElement).not.toBeNull();
  });
});
