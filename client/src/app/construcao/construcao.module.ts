import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ConstrucaoComponent } from './construcao.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
    },
    component: ConstrucaoComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ConstrucaoComponent]
})
export class ConstrucaoModule {}
