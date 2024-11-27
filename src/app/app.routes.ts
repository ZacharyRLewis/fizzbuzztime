import {Routes} from '@angular/router';
import {PromptComponent} from './prompt/prompt.component';
import {TimerComponent} from './timer/timer.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'prompt'},
  {path: 'prompt', component: PromptComponent},
  {path: 'timer/:fizz/:buzz', component: TimerComponent}
];
