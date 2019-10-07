import { Component } from '@angular/core';
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html'
})
export class EarningsComponent {
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
}
