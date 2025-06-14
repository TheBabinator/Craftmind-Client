import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthenticationService, ConnectionResult} from './authentication.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'authentication.component.html',
  styleUrl: 'authentication.component.scss',
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ]
})
export class AuthenticationComponent {
  protected router = inject(Router);
  protected authenticationService = inject(AuthenticationService);

  protected addressFormControl = new FormControl();
  protected tokenFormControl = new FormControl();
  protected addressFormControlClass = '';
  protected tokenFormControlClass = '';
  protected busy = false;

  constructor() {
    this.addressFormControl.valueChanges.subscribe(() => {
      this.addressFormControlClass = '';
      this.tokenFormControlClass = '';
    });
    this.tokenFormControl.valueChanges.subscribe(() => {
      this.addressFormControlClass = '';
      this.tokenFormControlClass = '';
    });
  }

  submit(): void {
    this.busy = true;
    this.addressFormControl.disable();
    this.tokenFormControl.disable();
    this.addressFormControlClass = '';
    this.tokenFormControlClass = '';
    this.authenticationService.connect(this.addressFormControl.value ?? '', this.tokenFormControl.value ?? '').subscribe(result => {
      this.busy = false;
      this.addressFormControl.enable();
      this.tokenFormControl.enable();
      if (result == ConnectionResult.BadAddress) {
        this.addressFormControlClass = 'is-invalid';
        this.tokenFormControlClass = '';
      } else if (result == ConnectionResult.BadToken) {
        this.addressFormControlClass = 'is-valid';
        this.tokenFormControlClass = 'is-invalid';
      } else {
        this.addressFormControlClass = 'is-valid';
        this.tokenFormControlClass = 'is-valid';
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
