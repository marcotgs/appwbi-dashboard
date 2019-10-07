import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-mix-stats',
  templateUrl: './mix-stats.component.html',
  styleUrls: ['./mix-stats.component.css']
})
export class MixstatsComponent implements AfterViewInit {
  constructor() { }

  // bar chart
  public barChartData: Array<any> = [
    { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3, 1.2, 2, 1.5, 1.1, 0.9], label: 'Cost' }
  ];
  public barChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];
  public barChartOptions: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.2
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public barChartColors: Array<any> = [
    {
      backgroundColor: '#4fc3f7',
      hoverBackgroundColor: '#4fc3f7',
      hoverBorderWidth: 2,
      hoverBorderColor: '#4fc3f7'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '.earningsbox1',
      data: {
        columns: [
          ['Site A', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        ],
        type: 'area-spline'
      },
      axis: {
        y: {
          show: false,
          tick: {
            count: 0,
            outer: false
          }
        },
        x: {
          show: false
        }
      },
      padding: {
        top: 0,
        right: -8,
        bottom: -28,
        left: -8
      },
      point: {
        r: 0
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#2961ff']
      }
    });

    const chart2 = c3.generate({
      bindto: '#visitor1',
      data: {
        columns: [['Success', 45], ['Pending', 15], ['Failed', 27]],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: '75%',
        width: 25
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c']
      }
    });
  }
}
