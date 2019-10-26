import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';

declare var require: any;

const data: any = require('./data.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-cam-stats',
  templateUrl: './cam-stats.component.html',
  styleUrls: ['./cam-stats.component.css']
})
export class CamStatsComponent {
  constructor() {}

  barChart: Chart = {
    type: 'Bar',
    data: data['Bar'],
    options: {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value) {
          return value / 1 + 'k';
        }
      },
      axisX: {
        showGrid: false
      },
      seriesBarDistance: 1,
      chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 0
      }
    }
  };
}
