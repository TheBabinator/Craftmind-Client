import {Routes} from '@angular/router';
import {TokenComponent} from './token/token.component';

export const routes: Routes = [
  {
    path: '',
    component: TokenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
