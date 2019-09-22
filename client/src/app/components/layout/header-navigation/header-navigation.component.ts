import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { UserState, getUserState, logout } from '@app/store/user';
import { AuthService } from '@app/services';
declare var $: any;

@Component({
  selector: 'header-navigation',
  templateUrl: './header-navigation.component.html'
})
export class HeaderNavigationComponent implements AfterViewInit {
  public userState: UserState = {};
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private authService: AuthService,
  ) {
    this.store.select(getUserState).subscribe((userState) => {
      this.userState = userState;
    });
  }

  public logout(): void {
    this.authService.logout();
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  ngAfterViewInit() { }
}
