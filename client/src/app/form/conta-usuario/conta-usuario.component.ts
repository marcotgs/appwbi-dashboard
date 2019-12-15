import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { combineLatest, Subject, Observable, merge, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { conformToMask } from 'angular2-text-mask';
import { UserState, updateProfile, getProfile, getProfileSuccess, loginSuccess, updateProfileError, postUser, getUserState } from '@app/store/user';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { UserResponse, CompanyResponse, SectorResponse, PermissionResponse } from '@shared/interfaces';
import MasksConstants from '@app/constants/mask/mask.contants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyState, SectorState, AccessPermissionState } from '@app/store/states';
import { getCompanies, getCompanyState } from '@app/store/company';
import { getSector, getSectorState } from '@app/store/sector';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { getAccessPermissionState, getPermissions } from '@app/store/access-permission';

@Component({
  selector: 'app-form-conta-usuario',
  templateUrl: './conta-usuario.component.html',
  styleUrls: ['./conta-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormContaUsuarioComponent {
  @Input('userData') public userData: UserResponse;
  @Input('modal') public modal: NgbActiveModal;
  @Input('isEditing') public isEditing: boolean;
  @Input('isCreating') public isCreating: boolean;
  @ViewChild('instance', { static: true }) instance;
  public manageAccountForm: FormGroup;
  public initialSpinner = 'initialSpinner';
  public saveSpinner = 'saveSpinner';
  public cepSpinner = 'cepSpinner';
  public isCepSpinnerShow = false;
  public isChangePasswordSpinnerShow = false;
  public cepMask = MasksConstants.CEP;
  public telMask = MasksConstants.TEL;
  public focusSector$ = new Subject<string>();
  public clickSector$ = new Subject<string>();
  public focusPermission$ = new Subject<string>();
  public clickPermission$ = new Subject<string>();
  public focusCompany$ = new Subject<string>();
  public clickCompany$ = new Subject<string>();
  private codigoCompletoCidadeIbge = null;
  private isSubmitting = false;
  private companies: CompanyResponse[] = [];
  private sectors: SectorResponse[] = [];
  private filteredSectors: SectorResponse[] = [];
  private permissions: PermissionResponse[] = [];
  private subscriptions = new Subscription();

  constructor(
    private spinner: NgxSpinnerService,
    private store: Store<UserState>,
    private storeCompany: Store<CompanyState>,
    private storeSector: Store<SectorState>,
    private storePermission: Store<AccessPermissionState>,
    private _actions$: Actions,
    private notifierService: NotifierService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.loadData();
    if (!this.userData && !this.modal) {
      this.getProfileData();
      this.updateProfileHandle();
    } else {
      this.initModal();
      this.store.select(getUserState)
        .subscribe((data) => {
          if (data.apiErrors) {
            this.spinner.hide(this.saveSpinner);
            this.enableForm();
            data.apiErrors.errors.forEach((error) => {
              this.notifierService.notify('error', error.message);
            });
            this.isSubmitting = false;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.spinner.hide(this.cepSpinner);
    this.spinner.hide(this.saveSpinner);
  }

  public getMessagesError(controlName: string): any {
    return (validationMessages[controlName] || validationMessages['default']);
  }

  public searchSector = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const inputFocus$ = this.focusSector$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.filteredSectors.map(v => v.descricao) :
        this.filteredSectors.map(v => v.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    // tslint:disable-next-line:semicolon
  }

  public searchCompany = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const inputFocus$ = this.focusCompany$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.companies.map(v => v.nome) :
        this.companies.map(v => v.nome).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    // tslint:disable-next-line:semicolon
  }

  public searchPermission = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const inputFocus$ = this.focusPermission$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.permissions.map(v => v.descricao) :
        this.permissions.map(v => v.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    // tslint:disable-next-line:semicolon
  }

  public async formSubmit(): Promise<void> {
    this.isSubmitting = true;
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
        codigoCompletoCidadeIbge: this.codigoCompletoCidadeIbge,
        idEmpresa: this.companies.find(p => p.nome === this.manageAccountForm.get('empresa').value).id,
        idSetor: this.filteredSectors.find(p => p.descricao === this.manageAccountForm.get('setor').value).id,
        idAcessoNiveisPermissao: this.permissions.find(p => p.descricao === this.manageAccountForm.get('perfil').value).id
      };
      delete payload.confirmPassword;
      delete payload.setor;
      delete payload.perfil;
      delete payload.empresa;
      if (this.modal) {
        if (this.isEditing) {
          payload.id = this.userData.id;
        }
        this.store.dispatch(postUser(payload));
      } else {
        this.store.dispatch(updateProfile(payload));
      }
    } else {
      this.isSubmitting = false;
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

  private initModal() {
    this.initManageAccountForm();
    this.codigoCompletoCidadeIbge = this.userData.codigoCompletoCidadeIbge;
    if (this.isCreating) {
      this.manageAccountForm.get('password').setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ]));
      this.manageAccountForm.get('confirmPassword').setValidators(Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ]));
    }
    this.manageAccountForm.get('empresa').valueChanges
      .subscribe((value) => {
        if (!this.manageAccountForm.get('empresa').disabled && !this.isSubmitting) {
          this.manageAccountForm.get('setor').reset();
          if (!value) {
            this.manageAccountForm.get('setor').disable();
          }
          else {
            this.filteredSectors = this.sectors.filter(s => s.empresa.nome === value);
            this.manageAccountForm.get('setor').enable();
          }
        }
      });
  }

  private loadData() {
    this.storeCompany.dispatch(getCompanies());
    this.storeSector.dispatch(getSector({}));
    this.storePermission.dispatch(getPermissions());
    combineLatest(this.storeCompany.select(getCompanyState),
      this.storeSector.select(getSectorState),
      this.storePermission.select(getAccessPermissionState),
      (companyState, sectorState, permissionState) => ({
        companies: companyState.companies,
        sectors: sectorState.sectors,
        permissions: permissionState.permissions,
      }))
      .subscribe(({ companies, sectors, permissions }) => {
        this.companies = companies;
        this.sectors = sectors;
        this.permissions = permissions;
        if (sectors && ((this.isEditing || !(this.modal)) && this.userData)) {
          this.filteredSectors = this.sectors.filter(s => s.empresa.nome === this.userData.empresa);
        }
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
      this.userData = { ...userData };
      const { formattedCgc, formattedTel, formattedDate } = this.formatUserData();
      this.userData.cgc = formattedCgc;
      this.userData.telefone = formattedTel;
      this.userData.dataNascimento = formattedDate;
      if (this.sectors.length > 0) {
        this.filteredSectors = this.sectors.filter(s => s.empresa.nome === this.userData.empresa);
      }
      this.initManageAccountForm();
    });
  }

  private updateProfileHandle(): void {
    this.subscriptions.add(this._actions$.pipe(ofType(loginSuccess)).subscribe(() => {
      this.spinner.hide(this.saveSpinner);
      this.enableForm();
      this.notifierService.notify('success', 'Dados atualizados!');
    }));
    this.subscriptions.add(this._actions$.pipe(ofType(updateProfileError)).subscribe(() => {
      this.spinner.hide(this.saveSpinner);
      this.enableForm();
      this.notifierService.notify('error', 'Erro ao salvar!');
    }));
  }

  private enableForm(): void {
    this.manageAccountForm.enable();
    this.manageAccountForm.get('endereco').disable();
    this.manageAccountForm.get('bairro').disable();
    this.manageAccountForm.get('cidade').disable();
    this.manageAccountForm.get('estado').disable();
    if (!this.modal) {
      this.manageAccountForm.get('email').disable();
      this.manageAccountForm.get('perfil').disable();
      this.manageAccountForm.get('empresa').disable();
    }
  }

  private formatUserData(): any {
    const formattedCgc = conformToMask(this.userData.cgc, this.getMaskCgc(this.userData.cgc), { guide: false }).conformedValue;
    const formattedTel = conformToMask(this.userData.ddd.concat(this.userData.telefone), this.telMask, { guide: false }).conformedValue;
    const birthdayDate = new Date(this.userData.dataNascimento);
    const month = birthdayDate.getMonth() + 1;
    const day = birthdayDate.getDate() + 1;
    const formattedDate = `${birthdayDate.getFullYear()}-${(month > 9 ? '' : '0') + month}-${(day > 9 ? '' : '0') + day}`;
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

    this.manageAccountForm = new FormGroup({
      email: new FormControl({ value: this.userData.email, disabled: (!(this.modal) || this.isEditing) },
        {
          validators: Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
          ]),
        }),
      nome: new FormControl(this.userData.nome, {
        validators: Validators.required,
      }),
      sobrenome: new FormControl(this.userData.sobrenome, {
        validators: Validators.required,
      }),
      cgc: new FormControl(this.userData.cgc, {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
        ]),
      }),
      telefone: new FormControl(this.userData.telefone, {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('[(]?[1-9]{2}[)]? [9]{0,1}[6-9]{1}[0-9]{3}[-]?[0-9]{4}')
        ]),
      }),
      cargo: new FormControl(this.userData.cargo, {
        validators: Validators.required,
      }),
      dataNascimento: new FormControl(this.userData.dataNascimento, {
        validators: Validators.required,
      }),
      perfil: new FormControl({ value: this.userData.perfil, disabled: !(this.modal) }, {
        validators: Validators.required,
      }),
      setor: new FormControl({ value: this.userData.setor, disabled: true }, {
        validators: Validators.required,
      }),
      empresa: new FormControl({ value: this.userData.empresa, disabled: !(this.modal) }, {
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
