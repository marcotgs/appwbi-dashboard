import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import AuthenticationRoutes from '@app/authentication/authentication.routing';
import { NotfoundComponent } from '@app/authentication/404/not-found.component';
import { LoginComponent } from '@app/authentication/login/login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(AuthenticationRoutes),
    ],
    declarations: [
        NotfoundComponent,
        LoginComponent,
    ]
})
export class AuthenticationModule { }
