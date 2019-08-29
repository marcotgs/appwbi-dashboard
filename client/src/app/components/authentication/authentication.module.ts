import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import AuthenticationRoutes from '@app/components/authentication/authentication.routing';
import { NotfoundComponent } from '@app/components/authentication/404/not-found.component';
import { LoginComponent } from '@app/components/authentication/login/login.component';
import { UserEffects } from '@app/store/user';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        RouterModule.forChild(AuthenticationRoutes),
        EffectsModule.forFeature([UserEffects])
    ],
    declarations: [
        NotfoundComponent,
        LoginComponent,
    ]
})
export class AuthenticationModule { }
