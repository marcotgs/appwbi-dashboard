import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor() {
    this.initLoginForm();
  }

  getMessagesError(controlName: string) {
    return validationMessages[controlName];
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
