import { Component } from '@angular/core';
@Component({
  selector: 'app-conversion-earnings',
  templateUrl: './conversion-earnings.component.html',
  styleUrls: ['./conversion-earnings.component.css']
})
export class ConversionEarningsComponent {
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
      backgroundColor: '#fff',
      hoverBackgroundColor: '#fff',
      hoverBorderWidth: 2,
      hoverBorderColor: '#fff'
    }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';
}
