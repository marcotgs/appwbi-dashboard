import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Módulos',
    icon: 'mdi mdi-dots-horizontal',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Faturamento',
    icon: 'mdi mdi-cart-outline',
    class: 'has-arrow',
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        ddclass: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Gráficos',
        icon: 'icon-chart ',
        class: 'has-arrow',
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/dashboard/cryptocurrency',
            path: '/construcao',
            title: 'Metas X Faturamento',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/dashboard/trendy',
            path: '/construcao',
            title: 'Metas X Rota',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/forms/multiselect',
            path: '/construcao',
            title: 'Metas X Vendedor',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/dashboard/grfaturxdevol',
            path: '/construcao',
            title: 'Faturamento X Devolução',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
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
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        ddclass: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Suporte',
        icon: 'icon-pin',
        class: 'has-arrow',
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/tables/aberturachamados',
            path: '/construcao',
            title: 'Controle de Chamados',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
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
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'Second Level',
        icon: 'mdi mdi-octagram',
        class: '',
        ddclass: '',
        extralink: true,
        submenu: []
      },
      {
        path: '',
        title: 'Acessos',
        icon: 'icon-login',
        class: 'has-arrow',
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/forms/conta-usuario',
            title: 'Conta',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Usuários',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Grupos de Usuários',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Permissões',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
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
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Empresas',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Filiais',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
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
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Módulos',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Rotinas',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          },
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Processos',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
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
        ddclass: '',
        extralink: false,
        submenu: [
          {
            //path: '/sample-pages/profile',
            path: '/construcao',
            title: 'Push',
            icon: 'mdi mdi-chevron-right',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
          }
        ]
      }
    ]
  },
];
