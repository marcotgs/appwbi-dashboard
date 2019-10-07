import { Component } from '@angular/core';

@Component({
  selector: 'app-rpb',
  templateUrl: './rpb.component.html',
  styleUrls: ['./rpb.component.css']
})
export class RpbComponent {
  constructor() { }

  public lineChartData: Array<any> = [
    { data: [12, 19, 3, 5, 2, 3], label: 'Bounce %' }
  ];
  public lineChartLabels: Array<any> = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'
  ];
  public lineChartOptions: any = {
    responsive: true,
    elements: {
      point: {
        radius: 2
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        }
      ]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#2961ff',
      pointBackgroundColor: '#2961ff',
      pointBorderColor: '#2961ff',
      pointHoverBackgroundColor: '#2961ff',
      pointHoverBorderColor: '#2961ff'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // line chart 2

  public lineChartData1: Array<any> = [
    { data: [22, 20, 26, 25, 19], label: 'Bounce %' }
  ];
  public lineChartLabels1: Array<any> = ['1', '5', '10', '3', '8'];
  public lineChartOptions1: any = {
    maintainAspectRatio: false,
    animation: {
      easing: 'easeInOutQuad',
      duration: 520
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false,
        ticks: {
          min: 0,
          max: 30,
          stepSize: 10,
          beginAtZero: true
        }
      }]
    },
    elements: {
      line: {
        tension: 0
      }
    },
    legend: {
      display: false
    }
  };
  public lineChartColors1: Array<any> = [
    {
      backgroundColor: 'transparent',
      pointRadius: 2,
      borderWidth: 2,
      borderColor: '#fff',
    }
  ];
  public lineChartLegend1 = false;
  public lineChartType1 = 'line';

  // bar chart
  public barChartData: Array<any> = [
    { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3], label: 'Cost' }
  ];
  public barChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7'
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
      backgroundColor: '#fff',
      hoverBackgroundColor: '#fff',
      hoverBorderWidth: 2,
      hoverBorderColor: '#fff'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';
}
