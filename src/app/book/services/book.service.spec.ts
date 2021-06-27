import {TestBed} from '@angular/core/testing';
import {BookService} from "./book.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('BookService', () => {
  let service: BookService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('find all books', () => {
    service.findAll().subscribe((value) => {
      expect(value?.length).toEqual(0)
    })

    const req = testingController.expectOne('/api/books')
    expect(req.request.method).toEqual('GET');
    req.flush([]);

    testingController.verify();
  });

  it('find all books (404)', () => {
    service.findAll().subscribe((value) => {
      expect(value?.length).toEqual(0)
    })

    const req = testingController.expectOne('/api/books')
    expect(req.request.method).toEqual('GET');
    req.flush(null,{status: 404, statusText:'Not found' });

    testingController.verify();
  });

});
