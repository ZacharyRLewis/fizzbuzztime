import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IntegerOnlyDirective} from '../integer-only.directive';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    FormsModule,
    IntegerOnlyDirective
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public time: string = '0:00:00';
  public message: string = '';
  private fizz: number | undefined;
  private buzz: number | undefined;
  private totalSeconds: number = 0;
  private maxSeconds: number = 35999;

  timer: any | undefined;

  ngOnInit(): void {
    this.fizz = this.route.snapshot.params["fizz"];
    this.buzz = this.route.snapshot.params["buzz"];
  }

  startTimer(): void {
    console.log('Start');

    this.timer = setInterval(() => {
      this.totalSeconds++;

      let minutes = Math.floor((this.totalSeconds / 60) % 60);
      let hours = Math.floor(this.totalSeconds / (60 * 60));
      let seconds = this.totalSeconds % 60;

      this.time = `${hours}:${this.padTimeString(minutes)}:${this.padTimeString(seconds)}`;

      this.message = '';

      if (this.fizz && (this.totalSeconds % this.fizz) == 0) {
        this.message = "fizz";
      }

      if (this.buzz && (this.totalSeconds % this.buzz) == 0) {
        this.message += "buzz";
      }

      if (this.totalSeconds == this.maxSeconds) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  stopTimer(): void {
    console.log('Stop');

    clearInterval(this.timer);
  }

  setTimes(): void {
    this.router.navigate(['/prompt']);
  }

  padTimeString(timeValue: number): string {
    if (timeValue < 10) {
      return "0" + timeValue;
    }
    return String(timeValue);
  }
}
