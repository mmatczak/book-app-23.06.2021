import {Component} from '@angular/core';
import {Book, BookProperties} from '../../model';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


export type FormValue<T> = T | { value: T; disabled: boolean };
export type FormModel<M> = {
  [P in keyof M] : FormModel<M[P]> | FormValue<M[P]> | [ FormValue<M[P]>, any?, any?] | [ FormValue<M[P]>, any?]
}

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  book: Book | undefined;
  bookFormGroup: FormGroup;

  constructor(
    private readonly books: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder) {
    this.book = route.snapshot.data.book;

    const authorGroupModel = {
      firstname: [this.bookFromRouting?.author.firstname || '', [Validators.required, maxLength(20)]],
      lastname: [this.bookFromRouting?.author.lastname || '', [Validators.required, maxLength(10)]],
    };
    const formModel: FormModel<BookProperties> = {
      author: this.fb.group(authorGroupModel),
      title: [{value: this.bookFromRouting?.title || '', disabled: !isNaN(this.bookFromRouting?.id)}, Validators.required],
      publishedYear: [this.bookFromRouting?.publishedYear || '', Validators.required],
    };
    this.bookFormGroup = this.fb.group(formModel);


    this.bookFormGroup.valueChanges.subscribe(console.log)
  }

  get bookFromRouting() {
    return this.route.snapshot.data.book;
  }

  onlyNumbers(event: KeyboardEvent) {
    console.log(event.key);
    if (!event.key.match(/[0-9]/)) {
      return false;
    }
    return true;
  }

  notifyOnBookChange(event: Event) {
    event.preventDefault();
    const book = this.bookFormGroup.value;
    if (this.book) { // edit existing
      const updatedBook: Book = {...this.book, ...book};
      this.books.save(updatedBook).subscribe(() => this.router.navigateByUrl('/books'))
    } else { // new book
      const bookProps: BookProperties = book;
      this.books.saveNew(bookProps).subscribe(() => this.router.navigateByUrl('/books'))
    }
  }
}

function maxLength(maxLimit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value?.length;
    return length > maxLimit ? {'tooLong': length} : null;
  }
}
