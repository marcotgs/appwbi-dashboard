import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'esqueceu-senha',
        component: ForgetPasswordComponent
      },
      {
        path: 'alterar-senha/:token',
        component: ChangePasswordComponent
      },
    ]
  }
];

export default AuthenticationRoutes;
