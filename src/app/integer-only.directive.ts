import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[integer-only]'
})
export class IntegerOnlyDirective {

  @Output() eventEmitter = new EventEmitter()

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.elementRef.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]*/g, '');
    this.elementRef.nativeElement.value = newValue;
    this.eventEmitter.emit(newValue);

    if (initialValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
