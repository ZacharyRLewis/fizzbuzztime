import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {
  public readonly MAX_SECONDS: number = 35999; // 9:59:59
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private totalSeconds: number = 0;
  public fizz: number | undefined;
  public buzz: number | undefined;
  public timer: any | undefined;
  public stopped: boolean = false;
  public started: boolean = false;
  public time: string = '';
  public message: string = '';

  ngOnInit(): void {
    this.fizz = this.route.snapshot.params['fizz'];
    this.buzz = this.route.snapshot.params['buzz'];
    this.updateDisplays();
  }

  public disableStartButton(): boolean {
    return this.started || this.totalSeconds === this.MAX_SECONDS;
  }

  public timeHasElapsed(): boolean {
    return this.totalSeconds > 0;
  }

  public returnToSetTimes(): void {
    this.router.navigate(['/prompt']);
  }

  public startTimer(): void {
    this.stopped = false;

    if (!this.started) {
      this.started = true;
      this.timer = setInterval(() => {
        this.tickTock();
      }, 1000);
    }
  }

  public stopTimer(): void {
    clearInterval(this.timer);
    this.started = false;

    if (this.stopped) {
      this.setTotalSeconds(0);
    } else {
      this.stopped = true;
    }
  }

  public tickTock(): void {
    this.totalSeconds++;
    this.updateDisplays();

    if (this.totalSeconds == this.MAX_SECONDS) {
      clearInterval(this.timer);
    }
  }

  public setTotalSeconds(seconds: number) {
    this.totalSeconds = seconds;
    this.updateDisplays();
  }

  private updateDisplays(): void {
    let hours = Math.floor(this.totalSeconds / (60 * 60));
    let minutes = this.padTimeString(Math.floor((this.totalSeconds / 60) % 60));
    let seconds = this.padTimeString(this.totalSeconds % 60);

    this.time = `${hours}:${minutes}:${seconds}`;
    this.message = '';

    if (this.totalSeconds > 0 && this.fizz && this.buzz) {
      if (this.totalSeconds % this.fizz == 0) {
        this.message = 'fizz';
      }

      if (this.totalSeconds % this.buzz == 0) {
        this.message += 'buzz';
      }
    }
  }

  private padTimeString(timeValue: number): string {
    if (timeValue < 10) {
      return '0' + timeValue;
    }
    return String(timeValue);
  }
}
