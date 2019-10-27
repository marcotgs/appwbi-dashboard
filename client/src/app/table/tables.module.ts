import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EffectsModule } from '@ngrx/effects';

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
import { TablesizeComponent } from './sizing/size.component';
import { ModuleEffects } from '@app/store/module';


@NgModule({
  imports: [
    EffectsModule.forRoot([ModuleEffects]),
    RouterModule.forChild(TablesRoutes),
    CommonModule,
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
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    AberturatableChamados,
  ]
})
export class TablesModule {}
