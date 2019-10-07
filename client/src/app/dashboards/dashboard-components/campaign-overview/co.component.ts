import { Component } from '@angular/core';
@Component({
  selector: 'app-campaign-overview',
  templateUrl: './co.component.html'
})
export class CamoverComponent {
  constructor() {}

  public lineChartData: Array<any> = [
    { data: [3, 8, 2, 3, 2, 5, 6, 8], label: 'A' },
    { data: [7, 6, 5, 8, 6, 7, 2, 1], label: 'B' }
  ];
  public lineChartLabels: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8];
  public lineChartOptions: any = {
    elements: { point: { radius: 2 } },
    responsive: true,
    maintainAspectRatio: false,
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
    },
    layout: {
      padding: {
        left: -10,
        right: 0,
        top: 0,
        bottom: -10
      }
    }
  };
  public lineChartColors: Array<any> = [
    {
      pointBorderColor: '#2961ff',
      pointHoverBackgroundColor: '#2961ff',
      pointHoverBorderColor: '#009efb',
      borderColor: '#2961ff',
      borderWidth: 1,
      backgroundColor: 'rgba(41, 97, 255, .3)',
      pointBackgroundColor: '#2961ff'
    },
    {
      pointBorderColor: '#4dd0e1',
      pointHoverBackgroundColor: '#4dd0e1',
      pointHoverBorderColor: '#55ce63',
      borderColor: '#4dd0e1',
      borderWidth: 1,
      backgroundColor: 'rgba(77, 208, 225, .3)',
      pointBackgroundColor: '#4dd0e1'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
}
