import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { CompanyState } from '@app/store/states';
import { ApiResponseError, CompanyResponse } from '@shared/interfaces';
import { FormGroup } from '@angular/forms';
import { deleteCompany, getCompanies, getCompanyState } from '@app/store/company';
import { conformToMask } from 'angular2-text-mask';
import MasksConstants from '@app/constants/mask/mask.contants';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class EmpresasComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
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
    private storeCompany: Store<CompanyState>,
    private notifierService: NotifierService,
  ) {
    this.getCompanies();
    this.initRows();
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Codigo' }, { name: 'Nome' }, { name: 'CGC' }, { name: 'Email' }];
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter((d) => {
      return d.nome.toLowerCase().indexOf(val) !== -1
        || d.nomeFormatado.toLowerCase().indexOf(val) !== -1
        || d.codigo.toLowerCase().indexOf(val) !== -1
        || d.rawCgc.toLowerCase().indexOf(val) !== -1
        || d.cgc.toLowerCase().indexOf(val) !== -1
        || d.email.toLowerCase().indexOf(val) !== -1
        || !val;
    });
    this.rows = temp;
  }

  public viewItem(id: number) {
    this.isCreating = false;
    this.isEditing = false;
    this.getSelectedItem(id);
    this.openModal();
  }

  public editItem(id: number) {
    this.isCreating = false;
    this.isEditing = true;
    this.getSelectedItem(id);
    this.openModal();
  }

  public showAlertDelete(id: number) {
    this.selectedItem = this.data.find(m => m.id === id);
    if (this.selectedItem.podeDeletar) {
      this.alertDeleteWarning.fire();
    } else {
      this.notifierService.notify('error', 'Este registro não pode ser excluído porque ele está amarrado a outros cadastros!');
    }
  }

  public deleteItem() {
    this.isDeleting = true;
    this.loading = true;
    this.storeCompany.dispatch(deleteCompany({ id: this.selectedItem.id }));
  }

  public addNewItem() {
    this.selectedItem = { segmento: {} };
    this.isCreating = true;
    this.isEditing = false;
    this.openModal();
  }

  public openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  public getMaskCgc(rawValue: string): (string | RegExp)[] {
    if (rawValue.replace(/(-|\/|\.)/gi, '').length > 11) {
      return MasksConstants.CNPJ;
    }
    return MasksConstants.CPF;
  }

  private getSelectedItem(id: number) {
    this.selectedItem = this.data.find(m => m.id === id);
    const { formattedCgc, formattedTel, formattedCep } = this.formatCompanyData();
    this.selectedItem = {
      ...this.selectedItem,
      telefone: formattedTel,
      cgc: formattedCgc,
      cep: formattedCep
    };
  }

  private formatCompanyData(): any {
    const formattedCgc = conformToMask(this.selectedItem.cgc, this.getMaskCgc(this.selectedItem.cgc), { guide: false }).conformedValue;
    const formattedTel = conformToMask(
      this.selectedItem.ddd.concat(this.selectedItem.telefone), MasksConstants.TEL, { guide: false }
    ).conformedValue;
    const formattedCep = conformToMask(
      this.selectedItem.cep, MasksConstants.CEP, { guide: false }
    ).conformedValue;
    return { formattedCgc, formattedTel, formattedCep };
  }

  private openModal() {
    this.modalService.open(this.modal, { centered: true });
  }

  private initRows() {
    this.storeCompany.select(getCompanyState)
      .subscribe(async (data) => {
        if (data.companies) {
          this.loading = false;
          this.rows = data.companies.map((r) => {
            return {
              ...r,
              rawCgc: r.cgc,
              [this.columns[0].name.toLowerCase()]: r.cod_empresa,
              [this.columns[1].name.toLowerCase()]: r.nome,
              [this.columns[2].name.toLowerCase()]: conformToMask(r.cgc, this.getMaskCgc(r.cgc), { guide: false }).conformedValue,
              [this.columns[3].name.toLowerCase()]: r.email,
            };
          });
          this.temp = [...this.rows];
          if ((data.companies.length > this.data.length && this.data.length > 0)
            || this.isEditing) {
            this.notifierService.notify('success', 'Salvo!');
            this.modalService.dismissAll();
            this.isSubmiting = false;
            this.isEditing = false;
            this.isCreating = false;
          } else if (this.isDeleting) {
            this.isDeleting = false;
            this.loading = false;
            this.notifierService.notify('success', 'Salvo!');
          }
          this.data = data.companies;
        }
      });
  }

  private getCompanies() {
    this.loading = true;
    this.storeCompany.dispatch(getCompanies());
  }

}