import {Component, Input} from '@angular/core';
import {IntegerOnlyDirective} from '../integer-only.directive';
import {FormsModule} from '@angular/forms';

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
  @Input() fizz: number | undefined;
  @Input() buzz: number | undefined;

  hasInvalidInput() : boolean {
    return !this.fizz || this.fizz < 2 || this.fizz > 10
      || !this.buzz || this.buzz < 2 || this.buzz > 10;
  }
}
