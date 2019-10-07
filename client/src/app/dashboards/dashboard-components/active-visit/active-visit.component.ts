import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-active-visit',
  templateUrl: './active-visit.component.html',
  styleUrls: ['./active-visit.component.css']
})
export class ActivevisitComponent implements AfterViewInit {
  public config: PerfectScrollbarConfigInterface = {};

  constructor() { }

  // bar chart
  public barChartData: Array<any> = [
    { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3, 0.5, 1.2, 1.0, 0.4, 0.9], label: 'Cost' }
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
        barPercentage: 0.2,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        display: false
      }]
    }
  };
  public barChartColors: Array<any> = [
    {
      backgroundColor: '#2962ff',
      hoverBackgroundColor: '#2962ff',
      hoverBorderWidth: 2,
      hoverBorderColor: '#2962ff'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '#visitor',
      data: {
        columns: [
          ['Open', 45],
          ['Clicked', 15],
          ['Un-opened', 27],
          ['Bounced', 18]
        ],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Visits',
        width: 35
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb']
      }
    });
  }
}
