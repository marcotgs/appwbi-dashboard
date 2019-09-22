import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from '@app/services';
import { Store } from '@ngrx/store';
import { UserState, loginSuccess } from '@app/store/user';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private dispatched = false;

  constructor(
    private routes: Router,
    private authService: AuthService,
    private store: Store<UserState>
  ) { }

  canActivate(
  ): boolean {
    if (this.authService.isLoggedIn()) {
      if (!this.dispatched) {
        this.store.dispatch(loginSuccess(this.authService.decodeToken()));
        this.dispatched = true;
      }
      return true;
    } else {
      this.routes.navigate(['/auth/login'], { replaceUrl: true });
      return false;
    }
  }
}
