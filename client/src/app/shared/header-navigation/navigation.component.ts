import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserState, logout, getUserState } from '@app/store/user';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public userState: UserState = {};
  public showSearch = false;

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
