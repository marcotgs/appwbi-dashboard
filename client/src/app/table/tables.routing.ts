import { Routes } from '@angular/router';
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
import { PermissoesComponent } from './permissoes/permissoes.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'datatable',
        component: DatatableComponent,
        data: {
          title: 'Data Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Data Table' }
          ]
        }
      },
      {
        path: 'controlechamados',
        component: ControleChamadosComponent,
        data: {
          title: 'Controle de Chamados',
        }
      },
      {
        path: 'empresas',
        component: EmpresasComponent,
        data: {
          title: 'Empresas',
        }
      },
      {
        path: 'filiais',
        component: FiliaisComponent,
        data: {
          title: 'Filiais',
        }
      },
      {
        path: 'setores',
        component: SetoresComponent,
        data: {
          title: 'Setores',
        }
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuários',
        }
      },
      {
        path: 'modulos',
        component: ModulosComponent,
        data: {
          title: 'Módulos',
        }
      },
      {
        path: 'rotinas',
        component: RotinasComponent,
        data: {
          title: 'Rotinas',
        }
      },
      {
        path: 'processos',
        component: ProcessosComponent,
        data: {
          title: 'Processos',
        }
      },
      {
        path: 'permissoes',
        component: PermissoesComponent,
        data: {
          title: 'Permissões',
        }
      },
      {
        path: 'basictables',
        component: BasictableComponent,
        data: {
          title: 'Basic Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Basic Tables' }
          ]
        }
      },
      {
        path: 'darktables',
        component: DarktableComponent,
        data: {
          title: 'Dark Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dark Tables' }
          ]
        }
      },
      {
        path: 'colortables',
        component: ColortableComponent,
        data: {
          title: 'Color Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'tablesizing',
        component: TablesizeComponent,
        data: {
          title: 'Table Sizing',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Table Sizing' }
          ]
        }
      },
      {
        path: 'smarttable',
        component: SmarttableComponent,
        data: {
          title: 'Smart Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'aberturachamados',
        component: AberturatableChamados,
        data: {
          title: 'Abertura de Chamados',
          urls: [
            { title: 'Help Desk' },
            { title: '' }
          ]
        }
      }
    ]
  }
];
