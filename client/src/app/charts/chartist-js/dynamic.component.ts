import { Component } from '@angular/core';
import { ChartType } from 'ng-chartist/dist/chartist.component';

import * as Chartist from 'chartist';

declare var require: any;

const data: any = require('./data.json');

@Component({
  selector: 'app-dynamic-chart',
  template: `
    <div class="row">
      <div class="col-md-6">
        <h4>Dynamic Chart Types</h4>
      </div>
      <div class="col-md-6">
        <select class="form-control" [(ngModel)]="type">
          <option *ngFor="let type of chartTypes" [ngValue]="type">{{type}}</option>
        </select>
      </div>
    </div>
    <x-chartist
      [data]="data"
      [type]="type"
      [options]="options">
    </x-chartist>
  `
})
class DynamicChartComponent {
  type: ChartType;
  data: Chartist.IChartistData;
  options: any;

  chartTypes: ChartType[];

  constructor() {
    this.chartTypes = ['Bar', 'Line'];

    this.type = 'Bar';
    this.data = data['Bar'];
    this.options = {
	  height: 400,
      axisX: {
        showLabel: false
      },
      axisY: {
        showLabel: false
      }
    };
  }
}

export { DynamicChartComponent };
