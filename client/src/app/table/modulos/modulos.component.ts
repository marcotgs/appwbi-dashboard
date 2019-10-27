import { Component, ViewEncapsulation, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { Store } from '@ngrx/store';
import { ModuleState, getModules, getModuleState } from '@app/store/module';


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
  public rows = [];
  public columns = [];
  public loading = false;
  editing = {};

  temp = [...data];

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private store: Store<ModuleState>,
    private notifierService: NotifierService,
  ) {
    this.getModules();
    this.store.select(getModuleState)
      .subscribe(async (data) => {
        if (data.modules) {
          this.loading = false;
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
    this.columns = [{ name: 'Descricao' }, { name: 'Permissao' }];

  }

  private getModules(pageNumber = 1) {
    this.loading = true;
    this.store.dispatch(getModules({ pageNumber }));
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
  }


  open2(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  open(content) {
    console.log(content);
    // this.modalService2.open(content, { windowClass: 'dark-modal' });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}