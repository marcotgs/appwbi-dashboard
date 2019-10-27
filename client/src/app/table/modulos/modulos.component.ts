import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { ModuleState, getModules, getModuleState } from '@app/store/module';
import { AccessPermissionState } from '@app/store/states';
import { getPermissions } from '@app/store/access-permission';
import { ModuleResponse } from '@shared/interfaces';


declare var require: any;
const data: any = require('./modulos.json');

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `
  ]
})

export class ModulosComponent implements OnInit {
  @ViewChild('modal', { static: true }) private modal: TemplateRef<any>;
  public rows = [];
  public columns = [];
  public loading = false;
  public isEditing = false;
  public isCreating = false;
  public selectedModule: ModuleResponse = null;
  private data: ModuleResponse[] = [];

  constructor(
    private modalService: NgbModal,
    private storeModule: Store<ModuleState>,
    private storeAccessPermission: Store<AccessPermissionState>,
    private notifierService: NotifierService,
  ) {
    this.getModules();
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
        }
      });
  }

  ngOnInit(): void {
    this.storeAccessPermission.dispatch(getPermissions());
    this.columns = [{ name: 'Descricao' }, { name: 'Permissao' }];

  }

  private getModules() {
    this.loading = true;
    this.storeModule.dispatch(getModules());
  }

  viewModule(id: number) {
    this.isCreating = false;
    this.isEditing = false;
    this.selectedModule = this.data.find(m => m.id === id);
    this.modalService.open(this.modal, { centered: true });
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}