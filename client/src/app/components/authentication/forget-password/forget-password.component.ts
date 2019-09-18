import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ApiResponseError } from '@app/api/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import {
    UserState, EMAIL_CHANGE_PASSWORD,
    EMAIL_CHANGE_PASSWORD_ERROR, EMAIL_CHANGE_PASSWORD_SUCCESS
} from '@app/store/user';


@Component({
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
    public forgetPasswordForm: FormGroup;
    public forgetPasswordErrors: ApiResponseError[] = [];
    @ViewChild('successAlert', { static: false }) private successAlert: SwalComponent;

    constructor(
        private spinner: NgxSpinnerService,
        private store: Store<UserState>,
        private _actions$: Actions,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.initForgetPasswordForm();
        this._actions$.pipe(ofType(EMAIL_CHANGE_PASSWORD_SUCCESS)).subscribe(async () => {
            await this.spinner.hide();
            await this.successAlert.fire();
            this.router.navigate(['/auth/login']);
        });
        this._actions$.pipe(ofType(EMAIL_CHANGE_PASSWORD_ERROR)).subscribe((data: any) => {
            this.toggleErrors(data.payload.errors);
        });
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.forgetPasswordForm.valid) {
            this.forgetPasswordForm.disable();
            await this.spinner.show();
            this.store.dispatch({
                type: EMAIL_CHANGE_PASSWORD,
                payload: { ...this.forgetPasswordForm.value, forgotPassword: true },
            });
        }
    }

    private toggleErrors(errors: ApiResponseError[]) {
        this.forgetPasswordErrors = errors;
        this.forgetPasswordForm.enable();
        this.spinner.hide();
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.forgetPasswordForm.controls).forEach(field => {
            const control = this.forgetPasswordForm.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    public getMessagesError(controlName: string): any {
        return validationMessages[controlName];
    }

    private initForgetPasswordForm(): void {
        this.forgetPasswordForm = new FormGroup({
            email: new FormControl('', {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
                ]),
                updateOn: 'blur',
            }),
        });
    }

}
