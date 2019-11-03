import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { AccessPermissionState, RoutineState, ProcessState } from '@app/store/states';
import { getPermissions, getAccessPermissionState } from '@app/store/access-permission';
import { RoutineResponse, ApiResponseError, PermissionResponse, ModuleResponse, ProcessResponse } from '@shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validationMessages from '@app/constants/form-validation/form-validation.constants';
import { getRoutineState, getRoutines } from '@app/store/routine';
import { postProcess, deleteProcess, getProcess, getProcessState } from '@app/store/process';

@Component({
  selector: 'app-processo',
  templateUrl: './processos.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class ProcessosComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  @ViewChild('instance', { static: true }) instance;
  public focusPermission$ = new Subject<string>();
  public clickPermission$ = new Subject<string>();
  public focusRoutine$ = new Subject<string>();
  public clickRoutine$ = new Subject<string>();
  public rows = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public isSubmiting = false;
  public isDeleting = false;
  public selectedItem: ProcessResponse = null;
  public form: FormGroup;
  public formErrors: ApiResponseError[] | string[] = [];
  private data: ProcessResponse[] = [];
  private permissions: PermissionResponse[] = [];
  private routines: RoutineResponse[] = [];
  @ViewChild('alertDeleteWarning', { static: false }) private alertDeleteWarning: SwalComponent;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storeProcess: Store<ProcessState>,
    private storeRoutine: Store<RoutineState>,
    private storeAccessPermission: Store<AccessPermissionState>,
    private notifierService: NotifierService,
  ) {
    this.initForm();
    this.getProcesses();
    this.initRows();
  }

  ngOnInit(): void {
    this.columns = [{ name: 'Descricao' }, { name: 'Rotina' }, { name: 'Modulo' }, { name: 'Permissao' }];
    this.storeAccessPermission.dispatch(getPermissions());
    this.storeRoutine.dispatch(getRoutines());
    this.storeAccessPermission.select(getAccessPermissionState)
      .subscribe(async (data) => {
        if (data.permissions) {
          this.permissions = data.permissions;
        }
      });
    this.storeRoutine.select(getRoutineState)
      .subscribe(async (data) => {
        if (data.routines) {
          this.routines = data.routines;
        }
      });
  }

  public filterTable(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.rows.filter((d) => {
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
        idAcessoNiveisPermissao: this.permissions.find(p => p.descricao === this.form.get('accessPermission').value).id,
        idCadastroRotinas: this.routines.find(p => p.descricao === this.form.get('routine').value).id,
      }
      if (this.isEditing) {
        payload.id = this.selectedItem.id;
      }
      delete payload.accessPermission;
      delete payload.routine;
      this.isSubmiting = true;
      this.storeProcess.dispatch(postProcess(payload));
    }
  }

  public search = (text$: Observable<string>) => {
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
  public searchRoutine = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const inputFocus$ = this.focusRoutine$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.routines.map(v => v.descricao) :
        this.routines.map(v => v.descricao).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
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
      accessPermission: this.selectedItem.acessoNiveisPermissao.descricao,
      routine: this.selectedItem.cadastroRotina.descricao
    });
    this.openModal();
  }

  public showAlertDelete(id: number) {
    this.selectedItem = this.data.find(m => m.id === id);
    this.alertDeleteWarning.fire();
  }

  public deleteItem() {
    this.isDeleting = true;
    this.storeRoutine.dispatch(deleteProcess({ id: this.selectedItem.id }));
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
    this.storeProcess.select(getProcessState)
      .subscribe(async (data) => {
        if (data.processes) {
          this.loading = false;
          this.data = data.processes;
          this.rows = data.processes.map((r) => {
            return {
              id: r.id,
              [this.columns[0].name.toLowerCase()]: r.descricao,
              [this.columns[1].name.toLowerCase()]: r.cadastroRotina.descricao,
              [this.columns[2].name.toLowerCase()]: r.cadastroRotina.cadastroModulo.descricao,
              [this.columns[3].name.toLowerCase()]: r.acessoNiveisPermissao.descricao,
            };
          });
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

  private getProcesses() {
    this.loading = true;
    this.storeProcess.dispatch(getProcess());
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
      routine: new FormControl('', {
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