import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, ofType } from '@ngrx/effects';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { Store } from '@ngrx/store';
import { UserState, getUserState, loginError, login } from '@app/store/user';
import { ApiResponseError } from '@shared/interfaces';
import { AuthTokenService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginErrors: ApiResponseError[] | string[] = [];

  constructor(
    private store: Store<UserState>,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _actions$: Actions,
    authTokenService: AuthTokenService,
  ) {
    if (authTokenService.isLoggedIn()) {
      this.router.navigate(['/starter'], { replaceUrl: true });
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
    this._actions$.pipe(ofType(loginError)).subscribe((data) => {
      this.toggleErrors(data.errors);
    });
    this.store.select(getUserState).subscribe((userState) => {
      if (userState.currentUser.email) {
        this.router.navigate(['/starter'], { replaceUrl: true });
      }
    });
  }

  ngOnDestroy(): void {
      this.spinner.hide();
  }

  private toggleErrors(errors: ApiResponseError[] | string[]) {
    this.loginErrors = errors;
    this.loginForm.enable();
    this.spinner.hide();
  }

  public async formSubmit(): Promise<void> {
    this.markFormFieldsAsTouched();
    if (this.loginForm.valid) {
      this.loginForm.disable();
      await this.spinner.show();
      this.store.dispatch(login(this.loginForm.value));
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
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ]),
      }),
      password: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ]),
      }),
    });
  }
}
