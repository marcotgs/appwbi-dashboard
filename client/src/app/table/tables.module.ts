import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TablesRoutes } from './tables.routing';
import { DatatableComponent } from './data-table/data-table.component';
import { ControleChamadosComponent } from './controle-chamados/controle-chamados.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { FiliaisComponent } from './filiais/filiais.component';
import { SetoresComponent } from './setores/setores.component';
import { ModulosComponent } from './modulos/modulos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RotinasComponent } from './rotinas/rotinas.component';
import { ProcessosComponent } from './processos/processos.component';
import { SmarttableComponent } from './smart-table/smart-table.component';
import { AberturatableChamados } from './abertura-chamados/abertura-table.chamados';
import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { PermissoesComponent } from './permissoes/permissoes.component';
import { TablesizeComponent } from './sizing/size.component';
import { ModuleEffects } from '@app/store/module';
import { RoutineEffects } from '@app/store/routine';
import { ProcessEffects } from '@app/store/process';
import { SectorEffects } from '@app/store/sector';
import { CompanyEffects } from '@app/store/company';
import { CompanyBranchEffects } from '@app/store/company-branch';
import { FormModule } from '@app/form/forms.module';


@NgModule({
  imports: [
    EffectsModule.forRoot([
      ModuleEffects, RoutineEffects, ProcessEffects,
      SectorEffects, CompanyEffects, CompanyBranchEffects]),
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule,
    NgbModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        vertical: {
          position: 'top',
        },
        horizontal: {
          position: 'right',
        }
      },
      behaviour: {
        autoHide: 2000,
      }
    }),
    SweetAlert2Module
  ],
  declarations: [
    DatatableComponent,
    BasictableComponent,
    ControleChamadosComponent,
    EmpresasComponent,
    FiliaisComponent,
    SetoresComponent,
    ModulosComponent,
    UsuariosComponent,
    RotinasComponent,
    ProcessosComponent,
    PermissoesComponent,
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    AberturatableChamados,
  ],
})
export class TablesModule { }
