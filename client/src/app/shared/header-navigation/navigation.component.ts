import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserState, logout, getUserState } from '@app/store/user';
import { Store } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';
import { AuthTokenService } from '@app/services';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
  public userState: UserState = {};
  public showSearch = false;
  public subscriptionUserState: Subscription = null;

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private authTokenService: AuthTokenService,
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        if (!(/auth/).test(val.url)) {
          this.subscribeUserState();
          if(this.userState.currentUser.nome){
            this.subscriptionUserState.unsubscribe();
          }
        }
      });
  }

  public logout(): void {
    this.authTokenService.logout();
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  private subscribeUserState(): void {
    this.subscriptionUserState = this.store.select(getUserState)
      .subscribe((userState) => {
        this.userState = userState;
      });
  }

  ngAfterViewInit() { }
}
