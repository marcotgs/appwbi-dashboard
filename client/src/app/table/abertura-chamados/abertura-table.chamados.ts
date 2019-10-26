import { Component } from '@angular/core';
import * as tableData from './abertura-data-chamados';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  templateUrl: './abertura-table.chamados.html'
})
export class AberturatableChamados {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
  }
  settings = tableData.settings;
  settings2 = tableData.settings2;
}