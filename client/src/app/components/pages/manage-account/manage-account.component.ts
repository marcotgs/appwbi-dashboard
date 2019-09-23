import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
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
    public cepSpinner = 'cepSpinner';
    public isCepSpinnerShow = false;
    public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    private codigoCompletoCidadeIbge = null;

    constructor(
        private spinner: NgxSpinnerService,
        private store: Store<UserState>,
        private _actions$: Actions,
        private notifierService: NotifierService,
        private http: HttpClient,
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
            const payload = { ...this.manageAccountForm.value, codigoCompletoCidadeIbge: this.codigoCompletoCidadeIbge };
            this.store.dispatch(updateProfile(payload));
        }
    }

    public async getAddressData() {
        await this.spinner.show(this.cepSpinner);
        this.isCepSpinnerShow = true;
        const cep = this.manageAccountForm.get('cep').value.replace('-', '');
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
            .subscribe(async (response: any) => {
                await this.spinner.hide(this.cepSpinner);
                this.isCepSpinnerShow = false;
                this.manageAccountForm.get('endereco').setValue(response.logradouro);
                this.manageAccountForm.get('cidade').setValue(response.localidade);
                this.manageAccountForm.get('estado').setValue(response.uf);
                this.manageAccountForm.get('complemento').setValue(response.complemento);
                this.manageAccountForm.get('bairro').setValue(response.bairro);
                this.codigoCompletoCidadeIbge = response.ibge;
            }, async () => {
                await this.spinner.hide(this.cepSpinner);
                this.isCepSpinnerShow = false;
                this.notifierService.notify('error', 'Erro ao buscar endereço!');
            });
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
            this.codigoCompletoCidadeIbge = (userData as any).codigoCompletoCidadeIbge;
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
        this.manageAccountForm.get('endereco').disable();
        this.manageAccountForm.get('bairro').disable();
        this.manageAccountForm.get('cidade').disable();
        this.manageAccountForm.get('estado').disable();
    }

    private initManageAccountForm(userData: acessoUsuariosModel & { cidade?: string, estado?: string }): void {
        this.manageAccountForm = new FormGroup({
            email: new FormControl({ value: userData.email, disabled: true }),
            nome: new FormControl(userData.nome, {
                validators: Validators.required,
            }),
            sobrenome: new FormControl(userData.sobrenome, {
                validators: Validators.required,
            }),
            cep: new FormControl(userData.cep, {
                validators: Validators.compose([
                    Validators.required,
                    Validators.pattern('^\\d{5}[-]\\d{3}$')
                ]),
            }),
            endereco: new FormControl({ value: userData.endereco, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            numero: new FormControl(userData.numero, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            complemento: new FormControl(userData.complemento),
            bairro: new FormControl({ value: userData.bairro, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            cidade: new FormControl({ value: userData.cidade, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
            estado: new FormControl({ value: userData.estado, disabled: true }, {
                validators: Validators.compose([
                    Validators.required,
                ]),
            }),
        });
    }
}
