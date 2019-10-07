import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { conformToMask } from 'angular2-text-mask';
import { UserState, updateProfile, getProfile, getProfileSuccess, loginSuccess, updateProfileError, sendEmailChangePassword, sendEmailChangePasswordSuccess } from '@app/store/user';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { acessoUsuariosModel } from '@app/api/interfaces';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-form-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.scss']
})
export class FormContaUsuarioComponent {
  public manageAccountForm: FormGroup;
  public initialSpinner = 'initialSpinner';
  public saveSpinner = 'saveSpinner';
  public changePasswordSpinner = 'changePasswordSpinner';
  public cepSpinner = 'cepSpinner';
  public isCepSpinnerShow = false;
  public isChangePasswordSpinnerShow = false;
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  private codigoCompletoCidadeIbge = null;
  @ViewChild('successAlert', { static: false }) private successAlert: SwalComponent;
  private userData: acessoUsuariosModel & { cidade?: string, estado?: string } = {};

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
    this._actions$.pipe(ofType(sendEmailChangePasswordSuccess)).subscribe(async () => {
      this.isChangePasswordSpinnerShow = false;
      await this.spinner.hide(this.changePasswordSpinner);
      await this.successAlert.fire();
    });
  }

  public async sendEmailChangePassword(): Promise<void> {
    this.isChangePasswordSpinnerShow = true;
    await this.spinner.show(this.changePasswordSpinner);
    this.store.dispatch(sendEmailChangePassword({
      email: this.userData.email,
    }));
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
      this.userData = userData;
      this.initManageAccountForm();
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

  private initManageAccountForm(): void {
    this.manageAccountForm = new FormGroup({
      email: new FormControl({ value: this.userData.email, disabled: true }),
      nome: new FormControl(this.userData.nome, {
        validators: Validators.required,
      }),
      sobrenome: new FormControl(this.userData.sobrenome, {
        validators: Validators.required,
      }),
      cep: new FormControl(conformToMask(this.userData.cep, this.cepMask, { guide: false }).conformedValue, {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^\\d{5}[-]\\d{3}$')
        ]),
      }),
      endereco: new FormControl({ value: this.userData.endereco, disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      numero: new FormControl(this.userData.numero, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      complemento: new FormControl(this.userData.complemento),
      bairro: new FormControl({ value: this.userData.bairro, disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      cidade: new FormControl({ value: this.userData.cidade, disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      estado: new FormControl({ value: this.userData.estado, disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
    });
  }
}
