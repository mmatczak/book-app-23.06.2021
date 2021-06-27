import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {BookService} from './book/services/book.service';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';
import {SharedModule} from './shared/shared.module';
import {BookResolver} from './book/components/book-details/book.resolver';
import {NotFoundDialogComponent} from './shared/dialogs/not-found-dialog.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./shared/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'book',
        children: [
          {
            path: 'new',
            component: BookDetailsComponent
          },
          {
            path: ':bookId',
            component: BookDetailsComponent,
            resolve: {
              book: BookResolver
            }
          },
        ]
      },
      {
        path: '**',
        component: NotFoundDialogComponent
      }
    ]),
    BookModule,
    SharedModule
  ],
  providers: [BookService, BookResolver,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
