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
  public menuPermissions = [];
  title = 'app';

  constructor(
    private storePermission: Store<AccessPermissionState>,
    private storeUser: Store<UserState>,
    private authToken: AuthTokenService,
  ) { /* */ }

  ngOnInit() {
    this.userStateObservable();
    this.permissionsStateObservable();
    if (this.authToken.isLoggedIn()) {
      this.loading = false;
    }
  }

  private userStateObservable() {
    this.storeUser.select(getUserState)
      .subscribe((data) => {
        if (Object.entries(data.currentUser).length !== 0
          && this.authToken.isLoggedIn()
          && this.menuPermissions.length === 0) {
          this.storePermission.dispatch(getMenuPermissions());
        } else if (!this.authToken.isLoggedIn()) {
          this.loading = false;
        }
      });
  }

  private permissionsStateObservable() {
    this.storePermission.select(getAccessPermissionState)
      .subscribe((data) => {
        if (data.menuPermissions) {
          this.menuPermissions = data.menuPermissions;
          this.loading = false;
        }
      });
  }
}
