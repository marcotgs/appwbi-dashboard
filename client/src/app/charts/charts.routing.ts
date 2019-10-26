import { Routes } from '@angular/router';

import { ChartistjsComponent } from './chartist-js/chartistjs.component';
import { ChartjsComponent } from './chart-js/chartjs.component';
import { NgxChartComponent } from './ngx-charts/ngx-chart.component';

export const ChartsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chartistjs',
        component: ChartistjsComponent,
        data: {
          title: 'Chartis js',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Chartis js Page' }
          ]
        }
      },
      {
        path: 'chartjs',
        component: ChartjsComponent,
        data: {
          title: 'Chart js',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Chart js Page' }
          ]
        }
      },
      {
        path: 'ngxchart',
        component: NgxChartComponent,
        data: {
          title: 'Ngx Charts',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Ngx Charts' }
          ]
        }
      }
    ]
  }
];
