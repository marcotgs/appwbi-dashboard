import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { AuthTokenService } from '@app/services';
import { Store } from '@ngrx/store';
import { UserState, loginSuccess } from '@app/store/user';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private dispatched = false;

  constructor(
    private routes: Router,
    private authToken: AuthTokenService,
    private store: Store<UserState>
  ) { }

  canActivate(
  ): boolean {
    if (this.authToken.isLoggedIn()) {
      if (!this.dispatched) {
        this.store.dispatch(loginSuccess(this.authToken.decodeToken()));
        this.dispatched = true;
      }
      return true;
    } else {
      this.routes.navigate(['/auth/login'], { replaceUrl: true });
      return false;
    }
  }
}
