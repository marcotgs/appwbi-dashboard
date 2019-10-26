import { Routes } from '@angular/router';

import { ToastrComponent } from './toastr/toastr.component';
import { UploadComponent } from './file-upload/upload.component';
import { EditorComponent } from './editor/editor.component';
import { DragComponent } from './drag-n-drop/drag.component';

export const ExtraComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'toastr',
        component: ToastrComponent,
        data: {
          title: 'Toastr Notification',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Toastr Page' }
          ]
        }
      },
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          title: 'Upload Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Upload Page' }
          ]
        }
      },
      {
        path: 'editor',
        component: EditorComponent,
        data: {
          title: 'Editor Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Editor Page' }
          ]
        }
      },
      {
        path: 'dragndrop',
        component: DragComponent,
        data: {
          title: 'DragComponent Page',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'DragComponent Page' }
          ]
        }
      }
    ]
  }
];
