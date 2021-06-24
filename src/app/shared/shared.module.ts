import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './app-header/app-header.component';
import {RouterModule} from '@angular/router';
import {NotFoundDialogComponent} from './dialogs/not-found-dialog.component';

@NgModule({
  declarations: [
    AppHeaderComponent, NotFoundDialogComponent
  ],
  exports: [
    AppHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
