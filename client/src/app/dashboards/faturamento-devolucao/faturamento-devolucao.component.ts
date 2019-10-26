import { Component, AfterViewInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist/dist/chartist.component';
import * as c3 from 'c3';

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
  selector: 'grfaturamentoxdevolucao',
  templateUrl: './faturamento-devolucao.component.html',
  styleUrls: ['./faturamento-devolucao.component.css']
})

export class FaturamentoDevolucaoComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart2 = c3.generate({
      bindto: '.grfatxdevol',
      data: {
        columns: [
          ['Faturamento', 2115053.50, 1982009.7, 2500198.33, 1170852.17, 9, 10, 14, 12, 11, 9, 8, 719],
          ['Devolução'  , 50000, 28360.98, 8, 3, 4,  5,  7,  6,  5, 6, 4,   3]
        ],
        type: 'bar'
      },
      axis: {
        y: {
          show: true,
          tick: {
            count: 0,
            outer: false
          }
        },
        x: {
          show: true
        }
      },
      bar: {
        width: 8
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 0,
        left: 20
      },
      point: {
        r: 0
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#2961ff', '#40c4ff', '#ff821c', '#7e74fb']
      }
    });
  }

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
    },
  };
}



