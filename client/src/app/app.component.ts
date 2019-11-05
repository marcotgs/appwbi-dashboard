import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccessPermissionState, getMenuPermissions, getAccessPermissionState } from '@app/store/access-permission';
import { AuthTokenService } from './services';
import { UserState, getUserState } from './store/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading = true;
  title = 'app';

  constructor(
    private storePermission: Store<AccessPermissionState>,
    private storeUser: Store<UserState>,
    private authToken: AuthTokenService,
  ) { /* */ }

  ngOnInit() {
    this.userStateObservable();
    this.permissionsStateObservable();
    if (!this.authToken.isLoggedIn()) {
      this.loading = false;
    }
  }

  private userStateObservable() {
    this.storeUser.select(getUserState)
      .subscribe((data) => {
        if (Object.entries(data.currentUser).length !== 0
          && this.authToken.isLoggedIn()
          && this.loading) {
          this.storePermission.dispatch(getMenuPermissions());
        }
      });
  }

  private permissionsStateObservable() {
    this.storePermission.select(getAccessPermissionState)
      .subscribe((data) => {
        if (data.menuPermissions) {
          this.loading = false;
        }
      });
  }
}
