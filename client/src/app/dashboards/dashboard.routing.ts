import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';
import { Dashboard5Component } from './dashboard5/dashboard5.component';
import { Dashboard6Component } from './dashboard6/dashboard6.component';
import { Dashboard7Component } from './dashboard7/dashboard7.component';
import { Dashboard8Component } from './dashboard8/dashboard8.component';
import { Dashboard9Component } from './dashboard9/dashboard9.component';
import { Dashboard10Component } from './dashboard10/dashboard10.component';

import { FaturamentoDevolucaoComponent } from './faturamento-devolucao/faturamento-devolucao.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'classic',
        component: Dashboard1Component,
        data: {
          title: 'Classic Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Classic Dashboard' }
          ]
        }
      },
      {
        path: 'analytical',
        component: Dashboard2Component,
        data: {
          title: 'Analytical Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Analytical Dashboard' }
          ]
        }
      },
      {
        path: 'cryptocurrency',
        component: Dashboard3Component,
        data: {
          title: 'Cryptocurrency Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Cryptocurrency Dashboard' }
          ]
        }
      },
      {
        path: 'grfaturxdevol',
        component: FaturamentoDevolucaoComponent,
        data: {
          title: '',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ]
        }
      },
      {
        path: 'overview',
        component: Dashboard4Component,
        data: {
          title: 'Overview Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Overview Dashboard' }
          ]
        }
      },
      {
        path: 'ecommerce',
        component: Dashboard5Component,
        data: {
          title: 'e-Commerce Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'e-Commerce Dashboard' }
          ]
        }
      },
      {
        path: 'sale',
        component: Dashboard6Component,
        data: {
          title: 'Sale Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Sale Dashboard' }
          ]
        }
      },
      {
        path: 'general',
        component: Dashboard7Component,
        data: {
          title: 'General Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'General Dashboard' }
          ]
        }
      },
      {
        path: 'trendy',
        component: Dashboard8Component,
        data: {
          title: 'Trendy Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Trendy Dashboard' }
          ]
        }
      },
      {
        path: 'campaign',
        component: Dashboard9Component,
        data: {
          title: 'Campaign Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Campaign Dashboard' }
          ]
        }
      },
      {
        path: 'modern',
        component: Dashboard10Component,
        data: {
          title: 'Modern Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Modern Dashboard' }
          ]
        }
      }
    ]
  }
];
