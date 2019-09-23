import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { UserState, getProfile, updateProfile, loginSuccess, getProfileSuccess, updateProfileError } from '@app/store/user';
import { acessoUsuariosModel } from '@app/api/interfaces';
import validationMessages from '@app/constants/form-validation/form-validation.constants';


@Component({
    selector: 'manage-account',
    templateUrl: './manage-account.component.html',
    styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
    public manageAccountForm: FormGroup;
    public initialSpinner = 'initialSpinner';
    public saveSpinner = 'saveSpinner';

    constructor(
        private spinner: NgxSpinnerService,
        private store: Store<UserState>,
        private _actions$: Actions,
        private notifierService: NotifierService,
    ) { }

    ngOnInit(): void {
        this.getProfileData();
        this.updateProfileHandle();
    }

    public getMessagesError(controlName: string): any {
        return (validationMessages[controlName] || validationMessages['default']);
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.manageAccountForm.valid) {
            this.manageAccountForm.disable();
            await this.spinner.show(this.saveSpinner);
            this.store.dispatch(updateProfile(this.manageAccountForm.value));
        }
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.manageAccountForm.controls).forEach(field => {
            const control = this.manageAccountForm.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }

    private getProfileData(): void {
        this.spinner.show(this.initialSpinner);
        this.store.dispatch(getProfile());
        this._actions$.pipe(ofType(getProfileSuccess)).subscribe(async (userData) => {
            await this.spinner.hide(this.initialSpinner);
            this.initManageAccountForm(userData);
        });
    }

    private updateProfileHandle(): void {
        this._actions$.pipe(ofType(loginSuccess)).subscribe(() => {
            this.spinner.hide(this.saveSpinner);
            this.enableForm();
            this.notifierService.notify('success', 'Dados atualizados!');
        });
        this._actions$.pipe(ofType(updateProfileError)).subscribe(() => {
            this.spinner.hide(this.saveSpinner);
            this.enableForm();
            this.notifierService.notify('error', 'Erro ao salvar!');
        });
    }

    private enableForm(): void {
        this.manageAccountForm.enable();
        this.manageAccountForm.get('email').disable();
    }

    private initManageAccountForm(userData: acessoUsuariosModel): void {
        this.manageAccountForm = new FormGroup({
            email: new FormControl({ value: userData.email, disabled: true }),
            nome: new FormControl(userData.nome, {
                validators: Validators.required,
            }),
            sobrenome: new FormControl(userData.sobrenome, {
                validators: Validators.required,
            })
        });
    }
}
