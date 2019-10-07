import { Routes } from '@angular/router';

import { CenterComponent } from './center/center.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';

export const TimelineRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'center',
        component: CenterComponent,
        data: {
          title: 'Center Timeline',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Center Timeline' }
          ]
        }
      },
      {
        path: 'left',
        component: LeftComponent,
        data: {
          title: 'Left Timeline',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Left Timeline' }
          ]
        }
      },
      {
        path: 'right',
        component: RightComponent,
        data: {
          title: 'Right Timeline',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Right Timeline' }
          ]
        }
      }
    ]
  }
];
