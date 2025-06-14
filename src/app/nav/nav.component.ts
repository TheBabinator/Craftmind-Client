import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrl: 'nav.component.scss',
  imports: [
    RouterLinkActive,
    RouterLink
  ]
})
export class NavComponent {
  protected router = inject(Router);
  protected authenticationService = inject(AuthenticationService);

  exit(): void {
    this.authenticationService.disconnect();
    this.router.navigateByUrl('/');
  }
}
