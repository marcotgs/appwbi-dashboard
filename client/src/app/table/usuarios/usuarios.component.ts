import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { CompanyState as UserState } from '@app/store/states';
import { ApiResponseError, UserResponse } from '@shared/interfaces';
import { FormGroup } from '@angular/forms';
import { conformToMask } from 'angular2-text-mask';
import MasksConstants from '@app/constants/mask/mask.contants';
import { getUserState, getUsers, deleteUser } from '@app/store/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class UsuariosComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  public rows = [];
  public temp = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public isSubmiting = false;
  public isDeleting = false;
  public selectedItem: UserResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: UserResponse[] = [];
  @ViewChild('alertDeleteWarning', { static: false }) private alertDeleteWarning: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private storeUser: Store<UserState>,
    private notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    this.columns = [{ name: 'Nome' }, { name: 'Sobrenome' }, { name: 'Email' }, { name: 'CGC' }];
    this.getUsers();
    this.initRows();
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter((d) => {
      return (
        d.nome.toLowerCase().indexOf(val) !== -1
        || d.email.toLowerCase().indexOf(val) !== -1
        || !val
      );
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
    this.alertDeleteWarning.fire();
  }

  public deleteItem() {
    this.isDeleting = true;
    this.loading = true;
    this.storeUser.dispatch(deleteUser({ id: this.selectedItem.id }));
  }

  public addNewItem() {
    this.selectedItem = {};
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
    const { formattedCgc, formattedTel, formattedCep, formattedDate } = this.formatUserData();
    this.selectedItem = {
      ...this.selectedItem,
      telefone: formattedTel,
      cgc: formattedCgc,
      cep: formattedCep,
      dataNascimento: formattedDate,
    };
  }

  private formatUserData(): any {
    const formattedCgc = conformToMask(this.selectedItem.cgc, this.getMaskCgc(this.selectedItem.cgc), { guide: false }).conformedValue;
    const formattedTel = conformToMask(
      this.selectedItem.ddd.concat(this.selectedItem.telefone), MasksConstants.TEL, { guide: false }
    ).conformedValue;
    const formattedCep = conformToMask(
      this.selectedItem.cep, MasksConstants.CEP, { guide: false }
    ).conformedValue;
    const birthdayDate = new Date(this.selectedItem.dataNascimento);
    const month = birthdayDate.getMonth() + 1;
    const day = birthdayDate.getDate() + 1;
    let formattedDate;
    if (this.isEditing) {
      formattedDate = `${birthdayDate.getFullYear()}-${(month > 9 ? '' : '0') + month}-${(day > 9 ? '' : '0') + day}`;
    } else {
      formattedDate = `${(day > 9 ? '' : '0') + day}-${(month > 9 ? '' : '0') + month}-${birthdayDate.getFullYear()}`;
    }
    return { formattedCgc, formattedTel, formattedCep, formattedDate };
  }

  private openModal() {
    this.modalService.open(this.modal, { centered: true });
  }

  private initRows() {
    this.storeUser.select(getUserState)
      .subscribe((data) => {
        if (data.users) {
          this.loading = false;
          this.rows = data.users.map((r) => {
            return {
              id: r.id,
              [this.columns[0].name.toLowerCase()]: r.nome,
              [this.columns[1].name.toLowerCase()]: r.sobrenome,
              [this.columns[2].name.toLowerCase()]: r.email,
              [this.columns[3].name.toLowerCase()]: conformToMask(r.cgc, this.getMaskCgc(r.cgc), { guide: false }).conformedValue,
            };
          });
          this.temp = [...this.rows];
          if ((data.users.length > this.data.length && this.data.length > 0)
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
          this.data = data.users;
        }
      });
  }

  private getUsers() {
    this.loading = true;
    this.storeUser.dispatch(getUsers());
  }

}