import { NgModule } from '@angular/core';
import AuthTokenService from './auth/auth-token.service';

@NgModule({
    providers: [AuthTokenService],
})
export class ServicesModule { }