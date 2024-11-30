import {Component, inject, Input} from '@angular/core';
import {IntegerOnlyDirective} from '../integer-only.directive';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'prompt',
  standalone: true,
  imports: [
    IntegerOnlyDirective,
    FormsModule
  ],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.scss'
})
export class PromptComponent {
  private router = inject(Router);

  @Input() public fizz: number | undefined;
  @Input() public buzz: number | undefined;

  public hasInvalidInput(): boolean {
    return !this.fizz || this.fizz < 2 || this.fizz > 10
      || !this.buzz || this.buzz < 2 || this.buzz > 10;
  }

  public goToTimer(): void {
    this.router.navigate(['/timer', this.fizz, this.buzz]);
  }
}
