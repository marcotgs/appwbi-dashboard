import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { CompanyBranchState, CompanyState } from '@app/store/states';
import { getCompanies, getCompanyState } from '@app/store/company';
import { CompanyResponse, ApiResponseError, CompanyBranchResponse } from '@shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { postCompanyBranch, deleteCompanyBranch, getCompaniesBranchs, getCompanyBranchState } from '@app/store/company-branch';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class FiliaisComponent implements OnInit {
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
  public selectedItem: CompanyBranchResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: CompanyBranchResponse[] = [];
  private companies: CompanyResponse[] = [];
  @ViewChild('alertDeleteWarning', { static: false }) private alertDeleteWarning: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storeCompanyBranch: Store<CompanyBranchState>,
    private storeCompany: Store<CompanyState>,
    private notifierService: NotifierService,
  ) {
    this.initForm();
    this.getCompanyBranches();
    this.initRows();
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Codigo' }, { name: 'Descricao' }, { name: 'Empresa' }];
    this.storeCompany.dispatch(getCompanies());
    this.storeCompany.select(getCompanyState)
      .subscribe(async (data) => {
        if (data.companies) {
          this.companies = data.companies;
        }
      });
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter((d) => {
      return d.descricao.toLowerCase().indexOf(val) !== -1 || !val;
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
        idEmpresa: this.companies.find(p => p.nome === this.form.get('company').value).id,
      }
      if (this.isEditing) {
        payload.id = this.selectedItem.id;
      }
      delete payload.company;
      this.isSubmiting = true;
      this.storeCompanyBranch.dispatch(postCompanyBranch(payload));
    }
  }

  public search = (text$: Observable<string>) => {
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
      company: this.selectedItem.empresa.nome,
    });
    this.openModal();
  }

  public showAlertDelete(id: number) {
    this.selectedItem = this.data.find(m => m.id === id);
    this.alertDeleteWarning.fire();
  }

  public deleteItem() {
    this.isDeleting = true;
    this.storeCompanyBranch.dispatch(deleteCompanyBranch({ id: this.selectedItem.id }));
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

  private openModal() {
    this.modalService.open(this.modal, { centered: true });
  }

  private initRows() {
    this.storeCompanyBranch.select(getCompanyBranchState)
      .subscribe(async (data) => {
        if (data.companiesBranchs) {
          this.loading = false;
          this.data = data.companiesBranchs;
          this.rows = data.companiesBranchs.map((r) => {
            return {
              id: r.id,
              [this.columns[0].name.toLowerCase()]: r.filial,
              [this.columns[1].name.toLowerCase()]: r.descricao,
              [this.columns[2].name.toLowerCase()]: r.empresa.nome,
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

  private getCompanyBranches() {
    this.loading = true;
    this.storeCompanyBranch.dispatch(getCompaniesBranchs());
  }

  private markFormFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      descricao: new FormControl('', {
        validators: Validators.required,
      }),
      company: new FormControl('', {
        validators: Validators.required,
      }),
      filial: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.maxLength(6),
        ]),
      }),
    });
  }
}