import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {IntegerOnlyDirective} from './integer-only.directive';
import {PromptComponent} from './prompt/prompt.component';

describe('IntegerOnlyDirective', () => {
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [IntegerOnlyDirective, PromptComponent],
    }).createComponent(PromptComponent);
    fixture.detectChanges();
  });

  it('should allow an integer value', () => {
    const fizz = fixture.debugElement.query(By.css('#fizz')).nativeElement;

    fizz.value = '5';
    fizz.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fizz.value).toEqual('5');
  });

  it('should not allow a decimal point', () => {
    const fizz = fixture.debugElement.query(By.css('#fizz')).nativeElement;

    fizz.value = '1.0';
    fizz.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fizz.value).toEqual('10');
  });

  it('should not allow a letter', () => {
    const fizz = fixture.debugElement.query(By.css('#fizz')).nativeElement;

    fizz.value = 'Z';
    fizz.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fizz.value).toEqual('');
  });
});
