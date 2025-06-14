import {Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'bridge',
    component: DashboardComponent,
  },
  {
    path: 'levels',
    component: DashboardComponent,
  },
  {
    path: 'turtles',
    component: DashboardComponent,
  },
  {
    path: 'alerts',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
