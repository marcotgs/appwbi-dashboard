import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Módulos',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Faturamento',
    icon: 'mdi mdi-cart-outline',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Gráficos',
        icon: 'icon-chart ',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/dashboard/cryptocurrency',
            path: '/construcao',
            title: 'Metas X Faturamento',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/dashboard/trendy',
            path: '/construcao',
            title: 'Metas X Rota',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/forms/multiselect',
            path: '/construcao',
            title: 'Metas X Vendedor',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/dashboard/grfaturxdevol',
            path: '/construcao',
            title: 'Faturamento X Devolução',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          }
        ]
      }
    ]
  },
  {
    path: '',
    title: 'Help Desk',
    icon: 'mdi mdi-message-text-outline',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Suporte',
        icon: 'icon-pin',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/tables/aberturachamados',
            path: '/construcao',
            title: 'Controle de Chamados',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          }
        ]
      }
    ]
  },
  {
    path: '',
    title: 'Configurador',
    icon: 'far fa-sun',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Acessos',
        icon: 'icon-login',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/forms/conta-usuario',
            title: 'Conta',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Usuários',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Grupos de Usuários',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Permissões',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          }
        ]
      },
      {
        path: '',
        title: 'Administração',
        icon: 'icon-wrench',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Empresas',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Filiais',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
        ]
      },
      {
        path: '',
        title: 'Sistema',
        icon: 'icon-layers',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Módulos',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Rotinas',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Processos',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          }
        ]
      },
      {
        path: '',
        title: 'Funções',
        icon: 'icon-paper-clip',
        class: 'has-arrow',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Push',
            icon: 'mdi mdi-chevron-right',
            class: '',
            extralink: false,
            submenu: []
          }
        ]
      }
    ]
  },
  {
    path: '',
    title: 'NÃO USAR - TESTES',
    icon: 'mdi mdi-view-dashboard',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/component/modal',
        title: 'Modal',
        icon: 'mdi mdi-tablet',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/ngx',
        title: 'NGX',
        icon: 'mdi mdi-tablet',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/multiselect',
        title: 'multiselect',
        icon: 'mdi mdi-tablet',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/pagination',
        title: 'Pagination',
        icon: 'mdi mdi-backburger',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/extra-component/upload',
        title: 'File Upload',
        icon: 'mdi mdi-arrow-up-box',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/buttons',
        title: 'Button',
        icon: 'mdi mdi-toggle-switch',
        class: '',
        extralink: false,
        submenu: []
      },
      { 
        path: '/component/notifier',
        title: 'Notifier',
        icon: 'mdi mdi-bandcamp', 
        class: '', 
        extralink: false, 
        submenu: [] 
      },
      {
        path: '/ecom/edit',
        title: 'Edit Products',
        icon: 'mdi mdi-cart-plus',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/forminputs',
        title: 'Form Inputs',
        icon: 'mdi mdi-priority-low',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/inputgroups',
        title: 'Input Groups',
        icon: 'mdi mdi-rounded-corner',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/inputgrid',
        title: 'Input Grid',
        icon: 'mdi mdi-select-all',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/checkboxandradio',
        title: 'Checkbox & Radio',
        icon: 'mdi mdi-shape-plus',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formbasic',
        title: 'Basic Forms',
        icon: 'mdi mdi-vector-difference-ba',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formhorizontal',
        title: 'Horizontal Forms',
        icon: 'mdi mdi-file-document-box',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formactions',
        title: 'Form Actions',
        icon: 'mdi mdi-code-greater-than',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formrowseparator',
        title: 'Row Separator',
        icon: 'mdi mdi-code-equal',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formstripedrows',
        title: 'Striped Rows',
        icon: 'mdi mdi-content-duplicate',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formdetail',
        title: 'Detail Forms',
        icon: 'mdi mdi-cards-outline',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/forms/formvalidation',
        title: 'Form Validation',
        icon: 'mdi mdi-alert-box',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/typehead',
        title: 'Form Typehead',
        icon: 'mdi mdi-backburger',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/component/datepicker',
        title: 'Datepicker',
        icon: 'mdi mdi-calendar-check',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/basictables',
        title: 'Basic Tables',
        icon: 'mdi mdi-border-all',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/darktables',
        title: 'Dark Basic Tables',
        icon: 'mdi mdi-border-all',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/colortables',
        title: 'Colored Tables',
        icon: 'mdi mdi-border-all',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/tablesizing',
        title: 'Table Sizing',
        icon: 'mdi mdi-border-all',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/smarttable',
        title: 'Smart Tables',
        icon: 'mdi mdi-border-left',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/datatable',
        title: 'Data Tables',
        icon: 'mdi mdi-border-vertical',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/authentication/404',
        title: '404',
        icon: 'mdi mdi-alert-outline',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/authentication/lock',
        title: 'Lockscreen',
        icon: 'mdi mdi-account-off',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/sample-pages/invoice',
        title: 'Invoice',
        icon: 'mdi mdi-ungroup',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
