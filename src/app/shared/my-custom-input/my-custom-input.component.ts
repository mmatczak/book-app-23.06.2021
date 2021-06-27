import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'ba-my-custom-input',
  templateUrl: './my-custom-input.component.html',
  styleUrls: ['./my-custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MyCustomInputComponent,
      multi: true,
    },
  ],
})
export class MyCustomInputComponent implements ControlValueAccessor {
  @ViewChild('input')
  input: ElementRef | undefined;

  disabled: boolean = false;

  #value: string = '';

  onChange = (value: string) => { };

  onTouched = () => { };

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  ngAfterViewInit() {
    if (this.input) {
      this.input.nativeElement.value = this.#value;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  writeValue(obj: any): void {
    if (this.input) {
      this.input.nativeElement.value = obj;
    }
    this.#value = obj
  }

  userInput(event: any) {
    this.onChange(this.input?.nativeElement.value);
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    return !!event.key.match(/[0-9]/);
  }
}
