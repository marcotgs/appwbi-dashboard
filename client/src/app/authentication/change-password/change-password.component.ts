import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { ofType, Actions } from '@ngrx/effects';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserState, changePasswordError, changePasswordSuccess, changePassword } from '@app/store/user';
import { ApiResponseError, ChangePasswordBody } from '@shared/interfaces';
import validationMessages from '@app/constants/form-validation/form-validation.constants';

@Component({
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;
    public changePasswordErrors: ApiResponseError[] | string[] = [];
    @ViewChild('successAlert', { static: false }) private successAlert: SwalComponent;

    constructor(
        private store: Store<UserState>,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,
        private _actions$: Actions,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.initchangePasswordForm();
        this._actions$.pipe(ofType(changePasswordError)).subscribe((data) => {
            this.toggleErrors(data.errors);
        });
        this._actions$.pipe(ofType(changePasswordSuccess)).subscribe(async () => {
            await this.spinner.hide();
            await this.successAlert.fire();
            this.router.navigate(['/auth/login'], { replaceUrl: true });
        });
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.changePasswordForm.valid) {
            this.changePasswordForm.disable();
            await this.spinner.show();
            this.store.dispatch(changePassword({
                newPassword: this.changePasswordForm.value.password,
                resetPasswordToken: this.activatedRoute.snapshot.paramMap.get("token"),
            } as ChangePasswordBody));
        }
    }

    public getMessagesError(controlName: string): any {
        return validationMessages[controlName];
    }

    private toggleErrors(errors: ApiResponseError[] | string[]) {
        this.changePasswordErrors = errors;
        this.changePasswordForm.enable();
        this.spinner.hide();
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.changePasswordForm.controls).forEach(field => {
            const control = this.changePasswordForm.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    private checkPasswords(control: AbstractControl): null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if ((password && confirmPassword) && confirmPassword.valid && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ mismatch: true });
        }
        return null;
    }

    private initchangePasswordForm(): void {
        this.changePasswordForm = new FormGroup({
            password: new FormControl('', {
                validators: Validators.compose([
                    Validators.required,
                    Validators.minLength(8)
                ]),
                updateOn: 'blur'
            }),
            confirmPassword: new FormControl('', {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
        }, {
            validators: this.checkPasswords
        });
    }

}
