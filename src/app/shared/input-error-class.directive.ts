import {Directive, HostBinding, OnInit, Self} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";

@Directive({
  selector: '[baInputErrorClass]'
})
export class InputErrorClassDirective implements OnInit {
  @HostBinding('class.is-invalid')
  isInvalid = false;

  constructor(@Self() private readonly ngControl: NgControl) {
  }

  ngOnInit() {
    this.ngControl.control?.statusChanges.subscribe(() => {
      this.isInvalid = this.ngControl?.invalid || false;
    });
  }
}
