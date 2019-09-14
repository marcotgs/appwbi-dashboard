import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponseError } from '@app/api/interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import validationMessages from '@app/constants/form-validation/form-validation.constants';

@Component({
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
    public forgetPasswordForm: FormGroup;
    public forgetPasswordErrors: ApiResponseError[] = [];

    constructor(private spinner: NgxSpinnerService) {
        this.initForgetPasswordForm();
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.forgetPasswordForm.valid) {
            this.forgetPasswordForm.disable();
            await this.spinner.show();
            // this.store.dispatch({ type: LOGIN, payload: this.loginForm.value });
        }
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
