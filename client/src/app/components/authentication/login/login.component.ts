import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { Store } from '@ngrx/store';
import { UserState, LOGIN } from '@app/store/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private store: Store<UserState>) {
    this.initLoginForm();
  }

  public formSubmit(): void {
    this.markFormFieldsAsTouched();
    if (this.loginForm.valid) {
      this.store.dispatch({ type: LOGIN, payload: this.loginForm.value })
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
      password: new FormControl('teste123456', {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ]),
        updateOn: 'blur'
      }),
    });
  }
}
