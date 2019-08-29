import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { reducers } from '@app/store/reducers';
import { ApiModule } from '@api/api.module';
import { AppRoutes } from './app.routes';
import { ServicesModule } from '@app/services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    ApiModule,
    RouterModule.forRoot(AppRoutes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
