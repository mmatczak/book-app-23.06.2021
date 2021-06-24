import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {BookService} from '../../services/book.service';
import {of} from 'rxjs';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;

  beforeEach(() => {
    return TestBed.configureTestingModule({
      imports: [],
      declarations: [BookOverviewComponent],
      providers: [{
        provide: BookService, useValue: {
          findAll() {
            return of([])
          }
        }
      }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
