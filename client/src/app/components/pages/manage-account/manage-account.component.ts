import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { UserState, getProfile, getUserState } from '@app/store/user';
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
        private notifierService: NotifierService,
    ) { }

    ngOnInit(): void {
        this.spinner.show(this.initialSpinner);
        this.store.dispatch(getProfile());
        this.store.select(getUserState).subscribe(async (userData) => {
            await this.spinner.hide(this.initialSpinner);
            this.initManageAccountForm(userData.user);
        });
    }

    public getMessagesError(controlName: string): any {
        return (validationMessages[controlName] || validationMessages['default']);
    }

    public async formSubmit(): Promise<void> {
        this.markFormFieldsAsTouched();
        if (this.manageAccountForm.valid) {
            this.manageAccountForm.disable();
            await this.spinner.show();
            // this.store.dispatch(login(this.manageAccountForm.value));
        }
    }

    private markFormFieldsAsTouched(): void {
        Object.keys(this.manageAccountForm.controls).forEach(field => {
            const control = this.manageAccountForm.get(field);
            control.markAsTouched({ onlySelf: true });
        });
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
