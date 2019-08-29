import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { Store } from '@ngrx/store';
import { UserState, LOGIN, getUserState, getToken } from '@app/store/user';
import { ApiResponseError } from '@app/api/interfaces';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loginErrors: ApiResponseError[] = [];
  private subscriptionUserState: Subscription;

  constructor(
    private store: Store<UserState>,
    private spinner: NgxSpinnerService,
    private router: Router,
    authService: AuthService,
  ) {
    if (authService.isLoggedIn()) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
    this.initLoginForm();
    this.subscriptionUserState = this.store.select(getUserState).subscribe((userState) => {
      this.toggleErrors(userState);
    });
  }

  private toggleErrors(userState: UserState) {
    if (userState.errors && userState.errors.length > 0) {
      this.loginErrors = userState.errors;
      this.loginForm.enable();
      this.spinner.hide();
    }
    else if (userState.token && !userState.errors) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  public async formSubmit(): Promise<void> {
    this.markFormFieldsAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.disable();
      await this.spinner.show();
      this.store.dispatch({ type: LOGIN, payload: this.loginForm.value });
    }
  }

  public getMessagesError(controlName: string): any {
    return validationMessages[controlName];
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('marcot.gualberto@gmail.com', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ]),
        updateOn: 'blur',
      }),
      password: new FormControl('teste1234567', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ]),
        updateOn: 'blur'
      }),
    });
  }

  ngOnDestroy(): void {
    this.subscriptionUserState.unsubscribe();
  }
}
