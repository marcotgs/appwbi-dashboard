import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html'
})
export class Login2Component {
  constructor() {}

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
