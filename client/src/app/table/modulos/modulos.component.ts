import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { ModuleState, getModules, getModuleState, postModule, deleteModule } from '@app/store/module';
import { AccessPermissionState } from '@app/store/states';
import { getPermissions, getAccessPermissionState } from '@app/store/access-permission';
import { ModuleResponse, ApiResponseError, PermissionResponse } from '@shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ModulosComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  @ViewChild('instance', { static: true }) instance;
  public focus$ = new Subject<string>();
  public click$ = new Subject<string>();
  public rows = [];
  public temp = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public isSubmiting = false;
  public isDeleting = false;
  public selectedItem: ModuleResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: ModuleResponse[] = [];
  private permissions: PermissionResponse[] = [];
  @ViewChild('alertDeleteWarning', { static: false }) private alertDeleteWarning: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storeModule: Store<ModuleState>,
    private storeAccessPermission: Store<AccessPermissionState>,
    private notifierService: NotifierService,
  ) {
    this.initForm();
    this.getModules();
    this.initRows();
  }

  ngOnInit(): void {
    this.storeAccessPermission.dispatch(getPermissions());
    this.columns = [{ name: 'Descricao' }, { name: 'Permissao' }];
    this.storeAccessPermission.select(getAccessPermissionState)
      .subscribe(async (data) => {
        if (data.permissions) {
          this.permissions = data.permissions;
        }
      });
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.descricao.toLowerCase().indexOf(val) !== -1
        || d.descricaoFormatada.toLowerCase().indexOf(val) !== -1
        || d.acessoNiveisPermissao.descricao.toLowerCase().indexOf(val) !== -1
        || d.acessoNiveisPermissao.descricaoFormatada.toLowerCase().indexOf(val) !== -1
        || !val;
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
        idAcessoNiveisPermissao: this.permissions.find(p => p.descricao === this.form.get('accessPermission').value).id
      }
      if (this.isEditing) {
        payload.id = this.selectedItem.id;
      }
      delete payload.accessPermission;
      this.isSubmiting = true;
      this.storeModule.dispatch(postModule(payload));
    }
  }

  public search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.permissions.map(v => v.descricao) :
        this.permissions.map(v => v.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
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
      accessPermission: this.selectedItem.acessoNiveisPermissao.descricao
    });
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
    this.storeModule.dispatch(deleteModule({ id: this.selectedItem.id }));
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

  private clearModalData() {
    this.isCreating = false;
    this.isEditing = false;
    this.isSubmiting = false;
  }

  private initRows() {
    this.storeModule.select(getModuleState)
      .subscribe(async (data) => {
        if (data.modules) {
          this.loading = false;
          this.data = data.modules;
          this.rows = data.modules.map((m) => {
            return {
              ...m,
              [this.columns[0].name.toLowerCase()]: m.descricao,
              [this.columns[1].name.toLowerCase()]: m.acessoNiveisPermissao.descricao,
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

  private getModules() {
    this.loading = true;
    this.storeModule.dispatch(getModules());
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
      accessPermission: new FormControl('', {
        validators: Validators.required,
      }),
      icone: new FormControl('', {
        validators: Validators.required,
      }),
    });
  }
}