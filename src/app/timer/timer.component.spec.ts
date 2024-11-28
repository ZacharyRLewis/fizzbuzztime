import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
  Tests:

  - Time starts at 0:00:00
  - Set Times button disabled if any time has elapsed
  - Start button disabled if timer is running
  - Stop button pauses timer
  - Stop button resets timer if timer was already stopped
  - At 61 seconds, timer reads 0:01:01
  - At 3601 seconds, timer reads 1:00:01
  - Timer stops automatically when reaching 9:59:59 and can't be started again
  - Displays fizz if totalSeconds is a multiple of fizz
  - Displays buzz if totalSeconds is a multiple of buzz
  - Displays fizzbuzz if totalSeconds is a multiple of fizz and buzz
  - If fizz is 2 and buzz is 3, at 1:06, it says fizzbuzz

*/
