import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { conformToMask } from 'angular2-text-mask';
import { UserState, updateProfile, getProfile, getProfileSuccess, loginSuccess, updateProfileError } from '@app/store/user';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { acessoUsuariosResponse } from '@shared/interfaces';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import MasksConstants from '@app/constants/mask/mask.contants';

@Component({
  selector: 'app-form-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.scss']
})
export class FormContaUsuarioComponent {
  public manageAccountForm: FormGroup;
  public initialSpinner = 'initialSpinner';
  public saveSpinner = 'saveSpinner';
  public cepSpinner = 'cepSpinner';
  public isCepSpinnerShow = false;
  public isChangePasswordSpinnerShow = false;
  public cepMask = MasksConstants.CEP;
  public telMask = MasksConstants.TEL;
  private codigoCompletoCidadeIbge = null;
  @ViewChild('successAlert', { static: false }) private successAlert: SwalComponent;
  private userData: acessoUsuariosResponse

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
      const [ddd, telefone] = this.manageAccountForm.get('telefone').value.split(' ');
      const payload = {
        ...this.manageAccountForm.value,
        ddd: ddd.replace(/\(|\)/gi, ''),
        telefone: telefone.replace(/\-/gi, ''),
        cgc: this.manageAccountForm.get('cgc').value.replace(/(-|\/|\.)/gi, ''),
        cep: this.manageAccountForm.get('cep').value.replace(/-/gi, ''),
        codigoCompletoCidadeIbge: this.codigoCompletoCidadeIbge
      };
      delete payload.confirmPassword;
      this.store.dispatch(updateProfile(payload));
    } else {
      this.notifierService.notify('error', 'Dados inválidos!');
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

  public getMaskCgc(rawValue: string): (string | RegExp)[] {
    if (rawValue.replace(/(-|\/|\.)/gi, '').length > 11) {
      return MasksConstants.CNPJ;
    }
    return MasksConstants.CPF;
  }

  public resetForm(): void {
    const { formattedCgc, formattedTel, formattedDate } = this.formatUserData();
    const value = {
      ...this.userData,
      telefone: formattedTel,
      cgc: formattedCgc,
      dataNascimento: formattedDate,
    }
    this.manageAccountForm.reset(value);
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
    this.manageAccountForm.get('perfil').disable();
    this.manageAccountForm.get('empresa').disable();
  }

  private formatUserData(): any {
    const formattedCgc = conformToMask(this.userData.cgc, this.getMaskCgc(this.userData.cgc), { guide: false }).conformedValue;
    const formattedTel = conformToMask(this.userData.ddd.concat(this.userData.telefone), this.telMask, { guide: false }).conformedValue;
    const birthdayDate = new Date(this.userData.dataNascimento);
    const month = birthdayDate.getMonth() + 1;
    const day = birthdayDate.getDate() + 1;
    const formattedDate = `${birthdayDate.getFullYear()}-${(month > 9 ? '' : '0') + month}-${(day > 9 ? '' : '0') + day}`
    return { formattedCgc, formattedTel, formattedDate };
  }

  private checkPasswords(control: AbstractControl): null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if ((password && confirmPassword) && confirmPassword.valid && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else if (confirmPassword.invalid && (password && !password.value)) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  private initManageAccountForm(): void {
    const { formattedCgc, formattedTel, formattedDate } = this.formatUserData();

    this.manageAccountForm = new FormGroup({
      email: new FormControl({ value: this.userData.email, disabled: true }),
      nome: new FormControl(this.userData.nome, {
        validators: Validators.required,
      }),
      sobrenome: new FormControl(this.userData.sobrenome, {
        validators: Validators.required,
      }),
      cgc: new FormControl(formattedCgc, {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
        ]),
      }),
      telefone: new FormControl(formattedTel, {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('[(]?[1-9]{2}[)]? [9]{0,1}[6-9]{1}[0-9]{3}[-]?[0-9]{4}')
        ]),
      }),
      cargo: new FormControl(this.userData.cargo, {
        validators: Validators.required,
      }),
      dataNascimento: new FormControl(formattedDate, {
        validators: Validators.required,
      }),
      perfil: new FormControl({ value: this.userData.perfil, disabled: true }, {
        validators: Validators.required,
      }),
      empresa: new FormControl({ value: this.userData.empresa, disabled: true }, {
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
      password: new FormControl(null, {
        validators: Validators.minLength(8),
      }),
      confirmPassword: new FormControl(null, {
        validators: Validators.minLength(8),
      }),
    }, {
      validators: this.checkPasswords
    });
  }
}
