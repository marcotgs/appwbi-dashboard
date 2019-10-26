import { Component, ViewChild } from '@angular/core';

declare var require: any;
const data: any = require('./controle-chamados.json');
@Component({
  selector: 'app-controle-chamados',
  templateUrl: './controle-chamados.component.html',
  styleUrls: ['./controle-chamados.css']
})

export class ControleChamadosComponent {
  editing = {};
  rows = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'data' }, { name: 'Chamado' }, { name: 'Setor' }, { name: 'Titulo' }, { name: 'Controles' }];

  @ViewChild(ControleChamadosComponent, { static: false }) table: ControleChamadosComponent;
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
