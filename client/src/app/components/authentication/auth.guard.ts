import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import AuthConstants from '@app/constants/auth/auth.constants';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(AuthConstants.LOCALSTORAGE_KEY_TOKEN) != null) {
      return true;
    } else {
      this.routes.navigate(['/auth/login'], { replaceUrl: true });
      return false;
    }
  }
}
