import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { ModuleState, getModules, getModuleState, postModule } from '@app/store/module';
import { AccessPermissionState } from '@app/store/states';
import { getPermissions, getAccessPermissionState } from '@app/store/access-permission';
import { ModuleResponse, ApiResponseError, PermissionResponse } from '@shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ModulosComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  public rows = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public isSubmiting = false;
  public selectedModule: ModuleResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: ModuleResponse[] = [];
  private permissions: PermissionResponse[] = [];
  @ViewChild('instance', { static: true }) instance;
  public focus$ = new Subject<string>();
  public click$ = new Subject<string>();

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

  public async formSubmit(): Promise<void> {
    this.markFormFieldsAsTouched();
    if (this.form.valid) {
      this.form.disable();
      await this.spinner.show();
      const payload = {
        ...this.form.value,
        idAcessoNiveisPermissao: this.permissions.find(p => p.descricao === this.form.get('accessPermission').value).id
      }
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
    this.selectedModule = this.data.find(m => m.id === id);
    this.modalService.open(this.modal, { centered: true });
  }

  public addNewItem() {
    this.isCreating = true;
    this.isEditing = false;
    this.modalService.open(this.modal, { centered: true });
  }

  public openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  public getMessagesError(controlName: string): any {
    return (validationMessages[controlName] || validationMessages['default']);
  }

  private initRows() {
    this.storeModule.select(getModuleState)
      .subscribe(async (data) => {
        if (data.modules) {
          this.loading = false;
          this.data = data.modules;
          this.rows = data.modules.map((m) => {
            return {
              id: m.id,
              [this.columns[0].name.toLowerCase()]: m.descricao,
              [this.columns[1].name.toLowerCase()]: m.acessoNiveisPermissao.descricao,
            };
          });
          if (this.isSubmiting) {
            this.isSubmiting = false;
            this.isEditing = false;
            this.isCreating = false;
            this.form.reset();
            this.form.enable();
            await this.spinner.hide();
            this.modalService.dismissAll();
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