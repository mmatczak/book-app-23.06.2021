import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './app-header/app-header.component';
import {RouterModule} from '@angular/router';
import {NotFoundDialogComponent} from './dialogs/not-found-dialog.component';
import {ValidationErrorComponent} from './validation-error/validation-error.component';
import {InputErrorClassDirective} from './input-error-class.directive';
import {MyCustomInputComponent} from "./my-custom-input/my-custom-input.component";

@NgModule({
  declarations: [
    AppHeaderComponent,
    MyCustomInputComponent,
    NotFoundDialogComponent,
    ValidationErrorComponent,
    InputErrorClassDirective
  ],
  exports: [
    AppHeaderComponent,
    ValidationErrorComponent,
    InputErrorClassDirective,
    MyCustomInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
