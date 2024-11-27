import {IntegerOnlyDirective} from './integer-only.directive';
import {ElementRef} from '@angular/core';

describe('IntegerOnlyDirective', () => {
  let elementRef: ElementRef;

  it('should create an instance', () => {
    const directive = new IntegerOnlyDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
