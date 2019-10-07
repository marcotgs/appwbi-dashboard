import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements AfterViewInit {
  constructor() {}

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
        title: 'Ratio',
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
