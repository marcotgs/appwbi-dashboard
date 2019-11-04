import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { CompanyState } from '@app/store/states';
import { ApiResponseError, CompanyResponse } from '@shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { postCompany, deleteCompany, getCompanies, getCompanyState } from '@app/store/company';
import { conformToMask } from 'angular2-text-mask';
import MasksConstants from '@app/constants/mask/mask.contants';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class EmpresasComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  @ViewChild('instance', { static: true }) instance;
  public focusCompany$ = new Subject<string>();
  public clickCompany$ = new Subject<string>();
  public rows = [];
  public temp = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public isSubmiting = false;
  public isDeleting = false;
  public selectedItem: CompanyResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: CompanyResponse[] = [];
  @ViewChild('alertDeleteWarning', { static: false }) private alertDeleteWarning: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storeCompany: Store<CompanyState>,
    private notifierService: NotifierService,
  ) {
    this.initForm();
    this.getCompanies();
    this.initRows();
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Codigo' }, { name: 'Nome' }, { name: 'CGC' }, { name: 'Email' }];
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter((d) => {
      return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
  }

  public async formSubmit(): Promise<void> {
    this.markFormFieldsAsTouched();
    if (this.form.valid) {
      this.form.disable();
      await this.spinner.show();
      const payload = {
        ...this.form.value,
      }
      if (this.isEditing) {
        payload.id = this.selectedItem.id;
      }
      this.isSubmiting = true;
      this.storeCompany.dispatch(postCompany(payload));
    }
  }

  // public search = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged()
  //   );
  //   const inputFocus$ = this.focusCompany$;

  //   return merge(debouncedText$, inputFocus$).pipe(
  //     map(term => (term === '' ? this.companies.map(v => v.nome) :
  //       this.companies.map(v => v.nome).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  //   );
  //   // tslint:disable-next-line:semicolon
  // }

  public viewItem(id: number) {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedItem = this.data.find(m => m.id === id);
    this.openModal();
  }

  public editItem(id: number) {
    this.isCreating = false;
    this.isEditing = true;
    this.form.reset();
    this.selectedItem = this.data.find(m => m.id === id);
    this.form.patchValue({
      ...this.selectedItem,
    });
    this.openModal();
  }

  public showAlertDelete(id: number) {
    this.selectedItem = this.data.find(m => m.id === id);
    this.alertDeleteWarning.fire();
  }

  public deleteItem() {
    this.isDeleting = true;
    this.storeCompany.dispatch(deleteCompany({ id: this.selectedItem.id }));
  }

  public addNewItem() {
    if (this.editItem) {
      this.form.reset();
    }
    this.isCreating = true;
    this.isEditing = false;
    this.openModal();
  }

  public openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  public getMessagesError(controlName: string): any {
    return (validationMessages[controlName] || validationMessages['default']);
  }

  public getMaskCgc(rawValue: string): (string | RegExp)[] {
    if (rawValue.replace(/(-|\/|\.)/gi, '').length > 11) {
      return MasksConstants.CNPJ;
    }
    return MasksConstants.CPF;
  }

  private openModal() {
    this.modalService.open(this.modal, { centered: true });
  }

  private initRows() {
    this.storeCompany.select(getCompanyState)
      .subscribe(async (data) => {
        if (data.companies) {
          this.loading = false;
          this.data = data.companies;
          this.rows = data.companies.map((r) => {
            return {
              id: r.id,
              [this.columns[0].name.toLowerCase()]: r.cod_empresa,
              [this.columns[1].name.toLowerCase()]: r.nome,
              [this.columns[2].name.toLowerCase()]: conformToMask(r.cgc, this.getMaskCgc(r.cgc), { guide: false }).conformedValue,
              [this.columns[3].name.toLowerCase()]: r.email,
            };
          });
          this.temp = [...this.rows];
          if (this.isSubmiting) {
            this.notifierService.notify('success', 'Salvo!');
            this.form.reset();
            this.form.enable();
            await this.spinner.hide();
            this.modalService.dismissAll();
            this.isSubmiting = false;
            this.isEditing = false;
            this.isCreating = false;
          } else if (this.isDeleting) {
            this.isDeleting = false;
            this.notifierService.notify('success', 'Salvo!');
          }
        }
      });
  }

  private getCompanies() {
    this.loading = true;
    this.storeCompany.dispatch(getCompanies());
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      cod_empresa: new FormControl('', {
        validators: Validators.required,
      }),
      nome: new FormControl('', {
        validators: Validators.required,
      }),
      razao: new FormControl('', {
        validators: Validators.required,
      }),
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ]),
      }),
      telefone: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('[(]?[1-9]{2}[)]? [9]{0,1}[6-9]{1}[0-9]{3}[-]?[0-9]{4}')
        ]),
      }),
      cgc: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')
        ]),
      }),
      cep: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^\\d{5}[-]\\d{3}$')
        ]),
      }),
      endereco: new FormControl({ value: '', disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      numero: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      complemento: new FormControl(''),
      bairro: new FormControl({ value: '', disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      cidade: new FormControl({ value: '', disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      estado: new FormControl({ value: '', disabled: true }, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
      ativo: new FormControl(true, {
        validators: Validators.compose([
          Validators.required,
        ]),
      }),
    });
  }
}