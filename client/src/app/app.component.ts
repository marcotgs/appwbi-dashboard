import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccessPermissionState, getMenuPermissions, getAccessPermissionState } from '@app/store/access-permission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading = true;
  title = 'app';

  constructor(
    private store: Store<AccessPermissionState>,
  ) { /* */ }

  ngOnInit() {
    this.store.dispatch(getMenuPermissions());
    this.store.select(getAccessPermissionState)
      .subscribe((data) => {
        if (data.menuPermissions) {
          this.loading = false;
        }
      });
  }
}
