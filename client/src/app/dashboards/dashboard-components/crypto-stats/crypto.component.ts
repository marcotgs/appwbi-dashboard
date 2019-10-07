import { Component } from '@angular/core';
@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html'
})
export class CryptoComponent {
  constructor() { }

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
