import { Component } from '@angular/core';
import * as c3 from 'c3';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';

declare var require: any;

const data: any = require('./data.json');

interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthviewComponent {
  constructor() {}

  lineChart: Chart = {
    type: 'Line',
    data: data['Line'],
    options: {
      low: 0,
      high: 28,
      showArea: true,
      fullWidth: true,
      chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 40
      },
      axisY: {
        onlyInteger: true,
        scaleMinSpace: 40,
        offset: 20,
        labelInterpolationFnc: function(value) {
          return value + 'k';
        }
      }
    },
    responsiveOptions: [
      [
        'screen and (max-width: 1023px)',
        {
          chartPadding: {
            top: 15,
            right: 12,
            bottom: 5,
            left: 10
          }
        }
      ]
    ]
  };
}
