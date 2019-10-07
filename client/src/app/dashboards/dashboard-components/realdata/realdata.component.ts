import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-realdata',
  templateUrl: './realdata.component.html',
  styleUrls: ['./realdata.component.css']
})
export class RealdataComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart2 = c3.generate({
      bindto: '#placeholder',
      data: {
        columns: [
          ['Site A', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          ['Site B', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        ],
        type: 'spline'
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
      padding: {
        top: 40,
        right: 10,
        bottom: 40,
        left: 20
      },
      point: {
        r: 0
      },
      legend: {
        hide: false
      },
      color: {
        pattern: ['#2961ff', '#ff821c', '#ff821c', '#7e74fb']
      }
    });
  }
}
