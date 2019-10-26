import { Component, AfterViewInit } from '@angular/core';
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
  selector: 'app-device-sales',
  templateUrl: './device-sales.component.html',
  styleUrls: ['./device-sales.component.css']
})
export class DeviceSalesComponent implements AfterViewInit {
  constructor() {}

  barChart: Chart = {
    type: 'Bar',
    data: data['Bar'],
    options: {
      axisX: {
        showGrid: false
      },
      seriesBarDistance: 1,
      chartPadding: {
        top: 15,
        right: 15,
        bottom: 5,
        left: 0
      },
      width: '100%'
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ]
  };

  ngAfterViewInit() {
    const chart1 = c3.generate({
      bindto: '#visitor',
      data: {
        columns: [
          ['Desktop', 40],
          ['Tablet', 12],
          ['Mobile', 28],
          ['None', 60]
        ],

        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Variations',
        width: 25
      },

      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#e9edf2']
      }
    });

    const chart2 = c3.generate({
      bindto: '#sales',
      data: {
        columns: [['2011', 45], ['2012', 15], ['2013', 27]],

        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        width: 15
      },

      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c']
      }
    });

    const chart3 = c3.generate({
      bindto: '#foo',
      data: {
        columns: [['data', 70.45]],
        type: 'gauge'
      },
      gauge: {
        label: {
          format: function(value, ratio) {
            return value;
          },
          show: false
        },
        min: 0,
        max: 100,
        units: ' %',
        width: 25
      },
      legend: {
        hide: true
      },
      size: {
        height: 100
      },
      color: {
        pattern: ['#7e74fb']
      }
    });
  }
}
