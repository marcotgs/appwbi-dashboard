import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './404/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutes } from './authentication.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthenticationRoutes),
    ],
    declarations: [
        NotfoundComponent,
        LoginComponent,
    ]
})
export class AuthenticationModule { }
