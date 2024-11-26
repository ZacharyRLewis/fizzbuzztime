import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromptComponent } from './prompt/prompt.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PromptComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fizzbuzztime';
}
