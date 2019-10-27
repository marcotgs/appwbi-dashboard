import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, getPermissions, getAuthState } from '@app/store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading = true;
  title = 'app';

  constructor(
    private store: Store<AuthState>,
  ) { /* */ }

  ngOnInit() {
    this.store.dispatch(getPermissions());
    this.store.select(getAuthState)
      .subscribe((data) => {
        if (data.permissions) {
          this.loading = false;
        }
      });
  }
}
