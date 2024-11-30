import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {TimerComponent} from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TimerComponent,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    clearInterval(component.timer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start time at 0:00:00', () => {
    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('0:00:00');
  });

  it('should count minutes correctly', () => {
    component.setTotalSeconds(61);
    fixture.detectChanges();

    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('0:01:01');
  });

  it('should count hours correctly', () => {
    component.setTotalSeconds(3601);
    fixture.detectChanges();

    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('1:00:01');
  });

  it(`should disable 'Set Times' button if any time has elapsed`, () => {
    component.setTotalSeconds(1);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#set-times-btn')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should disable Start button if timer is running', () => {
    const startButton = fixture.debugElement.query(By.css('#start-btn')).nativeElement;
    startButton.click();
    fixture.detectChanges();

    expect(startButton.disabled).toBeTruthy();
  });

  it('should pause timer on stop button click', () => {
    const startButton = fixture.debugElement.query(By.css('#start-btn')).nativeElement;
    startButton.click();
    component.tickTock();
    fixture.detectChanges();

    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('0:00:01');

    const stopButton = fixture.debugElement.query(By.css('#stop-btn')).nativeElement;
    stopButton.click();
    fixture.detectChanges();

    expect(component.stopped).toBeTruthy();
    expect(timebox.textContent).toEqual('0:00:01');
  });

  it('should reset timer on stop button click if timer was already stopped', () => {
    const startButton = fixture.debugElement.query(By.css('#start-btn')).nativeElement;
    startButton.click();
    component.tickTock();
    fixture.detectChanges();

    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('0:00:01');

    const stopButton = fixture.debugElement.query(By.css('#stop-btn')).nativeElement;
    stopButton.click();
    fixture.detectChanges();

    expect(component.stopped).toBeTruthy();

    stopButton.click();
    fixture.detectChanges();

    expect(timebox.textContent).toEqual('0:00:00');
  });

  it('should stop timer at 9:59:59 and disable Start button', () => {
    component.setTotalSeconds(component.MAX_SECONDS - 1);
    fixture.detectChanges();

    const startButton = fixture.debugElement.query(By.css('#start-btn')).nativeElement;
    startButton.click();
    component.tickTock();
    fixture.detectChanges();

    expect(startButton.disabled).toBeTruthy();

    const timebox = fixture.debugElement.query(By.css('#timebox')).nativeElement;
    expect(timebox.textContent).toEqual('9:59:59');
  });

  it('should display fizz if totalSeconds is a multiple of fizz', () => {
    component.fizz = 2;
    component.buzz = 3;
    component.setTotalSeconds(8);
    fixture.detectChanges();

    const fizzbuzz = fixture.debugElement.query(By.css('#fizzbuzz')).nativeElement;
    expect(fizzbuzz.textContent).toEqual('fizz');
  });

  it('should display buzz if totalSeconds is a multiple of buzz', () => {
    component.fizz = 2;
    component.buzz = 3;
    component.setTotalSeconds(9);
    fixture.detectChanges();

    const fizzbuzz = fixture.debugElement.query(By.css('#fizzbuzz')).nativeElement;
    expect(fizzbuzz.textContent).toEqual('buzz');
  });

  it('should display fizzbuzz if totalSeconds is a multiple of fizz and buzz', () => {
    component.fizz = 2;
    component.buzz = 3;
    component.setTotalSeconds(66);
    fixture.detectChanges();

    const fizzbuzz = fixture.debugElement.query(By.css('#fizzbuzz')).nativeElement;
    expect(fizzbuzz.textContent).toEqual('fizzbuzz');
  });

  it('should display nothing if totalSeconds is not a multiple of fizz or buzz', () => {
    component.fizz = 2;
    component.buzz = 3;
    component.setTotalSeconds(1);
    fixture.detectChanges();

    const fizzbuzz = fixture.debugElement.query(By.css('#fizzbuzz')).nativeElement;
    expect(fizzbuzz.textContent).toEqual('');
  });
});
