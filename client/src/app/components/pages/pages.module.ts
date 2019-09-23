import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { UserEffects } from '@app/store/user';


import pageRoutes from './pages.routes';
import { StarterComponent } from './starter/starter.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NotifierModule.withConfig({
            position: {
                vertical: {
                    position: 'top',
                },
                horizontal: {
                    position: 'right',
                }
            },
            behaviour: {
                autoHide: 2000,
            }
        }),
        EffectsModule.forFeature([UserEffects]),
        CommonModule,
        RouterModule.forChild(pageRoutes)],
    declarations: [
        StarterComponent,
        ManageAccountComponent
    ]
})
export class PagesModule { }
