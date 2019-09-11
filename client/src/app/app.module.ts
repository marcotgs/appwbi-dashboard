import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from '@app/app.component';
import { reducers } from '@app/store/reducers';
import { ApiModule } from '@api/api.module';
import { AppRoutes } from './app.routes';
import { ServicesModule } from '@app/services';
import { AuthGuard } from '@app/components/authentication/auth.guard';
import { LayoutModule } from '@app/components/layout/layout.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    ApiModule,
    LayoutModule,
    RouterModule.forRoot(AppRoutes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
