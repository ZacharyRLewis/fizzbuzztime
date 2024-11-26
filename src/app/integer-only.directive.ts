import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[integer-only]'
})
export class IntegerOnlyDirective {

  @Output() valueChange = new EventEmitter()

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.elementRef.nativeElement.value;
    const newValue = initalValue.replace(/[^0-9]*/g, '');
    this.elementRef.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
