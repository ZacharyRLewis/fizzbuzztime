import { Routes } from '@angular/router';
import { PromptComponent } from 'prompt';
import { TimerComponent } from 'timer';

export const routes: Routes = [
  {path: 'prompt', component: PromptComponent},
  {path: 'timer', component: TimerComponent}
];
