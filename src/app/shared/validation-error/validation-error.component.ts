import {Component, ContentChild, HostBinding, Input} from '@angular/core';
import {AbstractControl, FormControl, NgControl} from "@angular/forms";

@Component({
  selector: 'ba-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
  @ContentChild(NgControl)
  formControl: AbstractControl | null | undefined;
}
