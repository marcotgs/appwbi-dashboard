import { NgModule, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsRoutes } from './forms.routing';
import { CustomFormsModule } from 'ng2-validation';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { NGXFormWizardModule } from "./ngx-wizard/ngx-wizard.module";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EffectsModule } from '@ngrx/effects';
import { TextMaskModule } from 'angular2-text-mask';
import { UserEffects } from '@app/store/user';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormBasicComponent } from './form-basic/basic.component';
import { FormvalComponent } from './form-validation/form-validation.component';
import { CheckradioComponent } from './checkbox-radio/cr.component';
import { ForminputsComponent } from './form-inputs/inputs.component';
import { GridsComponent } from './input-grids/grids.component';
import { InputgroupsComponent } from './input-groups/input-groups.component';
import { FormhorizontalComponent } from './form-horizontal/horizontal.component';
import { FormactionsComponent } from './form-actions/actions.component';
import { FormrowsepComponent } from './form-row-separator/row-sep.component';
import { FormstripedComponent } from './form-striped-row/striped.component';
import { FormContaUsuarioComponent } from './conta-usuario/conta-usuario.component';
import { FormModulosComponent } from './form-modulos/form-modulos.component';
import { FormSetoresComponent } from './form-setores/form-setores.component';
import { FormRotinasComponent } from './form-rotinas/form-rotinas.component';
import { FormFiliaisComponent } from './form-filiais/form-filiais.component';
import { FormProcessosComponent } from './form-processos/form-processos.component';
import { FormdetailComponent } from './form-detail/detail.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    RouterModule.forChild(FormsRoutes),
    FormsModule,
    NGXFormWizardModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    CustomFormsModule,
    ReactiveFormsModule,
    TextMaskModule,
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
    SweetAlert2Module],
  declarations: [
    FormBasicComponent,
    FormvalComponent,
    CheckradioComponent,
    ForminputsComponent,
    GridsComponent,
    InputgroupsComponent,
    FormhorizontalComponent,
    FormactionsComponent,
    FormrowsepComponent,
    FormstripedComponent,
    FormContaUsuarioComponent,
    FormFiliaisComponent,
    FormModulosComponent,
    FormSetoresComponent,
    FormRotinasComponent,
    FormProcessosComponent,
    MultiselectComponent,
    FormdetailComponent,
    FormEmpresaComponent,
  ],
  exports: [
    FormEmpresaComponent,
    FormContaUsuarioComponent
  ]
})
export class FormModule { }
