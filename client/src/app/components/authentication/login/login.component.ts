import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Actions, ofType } from '@ngrx/effects';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { Store } from '@ngrx/store';
import { UserState, getUserState, LOGIN, LOGIN_ERROR, } from '@app/store/user';
import { ApiResponseError } from '@app/api/interfaces';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginErrors: ApiResponseError[] = [];

  constructor(
    private store: Store<UserState>,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _actions$: Actions,
    authService: AuthService,
  ) {
    if (authService.isLoggedIn()) {
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
    this._actions$.pipe(ofType(LOGIN_ERROR)).subscribe((data: any) => {
      this.toggleErrors(data.payload.errors);
    });
    this.store.select(getUserState).subscribe((userState) => {
      if (userState.token) {
        this.router.navigate(['/'], { replaceUrl: true });
      }
    });
  }

  private toggleErrors(errors: ApiResponseError[]) {
    this.loginErrors = errors;
    this.loginForm.enable();
    this.spinner.hide();
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
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ]),
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ]),
        updateOn: 'blur'
      }),
    });
  }
}
