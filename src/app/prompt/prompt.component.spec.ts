import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {PromptComponent} from './prompt.component';

describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should disable 'Go to Timer' button if fizz and buzz values are invalid`, () => {
    component.fizz = 0;
    component.buzz = 1;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#go-to-timer-btn')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it(`should enable 'Go to Timer' button if fizz and buzz values are valid`, () => {
    component.fizz = 2;
    component.buzz = 10;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#go-to-timer-btn')).nativeElement;
    expect(button.disabled).toBeFalsy();
  });
});
