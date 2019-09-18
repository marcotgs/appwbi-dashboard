import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import AuthenticationRoutes from '@app/components/authentication/authentication.routing';
import { LoginComponent } from '@app/components/authentication/login/login.component';
import { UserEffects } from '@app/store/user';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        RouterModule.forChild(AuthenticationRoutes),
        EffectsModule.forFeature([UserEffects]),
        SweetAlert2Module
    ],
    declarations: [
        LoginComponent,
        ForgetPasswordComponent,
        ChangePasswordComponent
    ]
})
export class AuthenticationModule { }
