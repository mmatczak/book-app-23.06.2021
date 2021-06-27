// import {BookDetailsComponent} from './book-details.component';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {Book} from '../../model';
// import createSpy = jasmine.createSpy;
//
// describe('BookDetailsComponent', () => {
//   let testBook: Book, testAuthor: string, testTitle: string, changedTitle: string, changedAuthor: string;
//
//   beforeEach(() => {
//     changedAuthor = 'Changed author';
//     changedTitle = 'Changed title';
//     testAuthor = 'Test author';
//     testTitle = 'Test title';
//     testBook = {id: 0, title: testTitle, author: testAuthor}
//   });
//
//   describe('class testing', () => {
//     it('notifies on changed book', () => {
//         // 1. given
//         const event = createEventMockWith();
//         const component = new BookDetailsComponent();
//         component.book = testBook;
//         component.bookChange.subscribe(changedBook => {
//           // 3. then
//           expect(event.preventDefault).toHaveBeenCalledWith()
//           expect(changedBook).toBeDefined();
//           expect(changedBook.author).toBe(changedAuthor);
//           expect(changedBook.title).toBe(changedTitle);
//         });
//         // 2. when
//         component.notifyOnBookChange(event);
//       }
//     );
//
//     function createEventMockWith(): any {
//       return {
//         preventDefault: createSpy('preventDefault'),
//         target: {
//           querySelector(selector: string) {
//             const value = selector === '#author' ? changedAuthor : changedTitle;
//             return {value}
//           }
//         }
//       }
//     }
//   });
//   describe('DOM testing', () => {
//     let fixture: ComponentFixture<BookDetailsComponent>,
//       component: BookDetailsComponent,
//       element: HTMLElement;
//
//     beforeEach(() => {
//       return TestBed.configureTestingModule({
//         declarations: [BookDetailsComponent]
//       }).compileComponents()
//     });
//
//     beforeEach(() => {
//       fixture = TestBed.createComponent(BookDetailsComponent);
//       component = fixture.componentInstance;
//       element = fixture.nativeElement as HTMLElement;
//     })
//
//     it('populates author and title to inputs', () => {
//       // given
//       component.book = testBook;
//       // when
//       fixture.detectChanges();
//       // then
//       const authorElement = element.querySelector<HTMLInputElement>('#author');
//       expect(authorElement).not.toBeNull();
//       expect(authorElement?.value).toBe(testAuthor);
//     });
//
//     it('notifies on changes when author input modified', () => {
//       // given
//       component.book = testBook;
//       fixture.detectChanges();
//       component.bookChange.subscribe(changedBook => {
//         // then
//         expect(changedBook).toBeDefined();
//         expect(changedBook.author).toBe(changedAuthor);
//         expect(changedBook.title).toBe(testTitle);
//       });
//       // when
//       form()
//         .setInput('#author', changedAuthor)
//         .clickOnApplyChanges();
//     });
//
//     function form() {
//       return {
//         setInput(selector: string, value: string) {
//           const authorElement = element.querySelector<HTMLInputElement>(selector);
//           if (authorElement) {
//             authorElement.value = value;
//           }
//           authorElement?.dispatchEvent(new Event('change'));
//
//           return this;
//         },
//         clickOnApplyChanges() {
//           const button = element.querySelector<HTMLButtonElement>('button');
//           button?.click();
//           return this;
//         }
//       }
//     }
//
//     // function clickOnApplyChanges() {
//     //   const button = element.querySelector<HTMLButtonElement>('button');
//     //   button?.click();
//     // }
//     //
//     // function setInput(selector: string) {
//     //   return {
//     //     toValue(value: string) {
//     //       const authorElement = element.querySelector<HTMLInputElement>(selector);
//     //       if (authorElement) {
//     //         authorElement.value = value;
//     //       }
//     //       authorElement?.dispatchEvent(new Event('change'));
//     //     }
//     //   }
//     // }
//   })
// });
//
//
