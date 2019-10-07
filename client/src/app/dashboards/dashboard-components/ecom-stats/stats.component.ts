import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '.earningsbox',
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
        pattern: ['#40c4ff', '#dadada', '#ff821c', '#7e74fb']
      }
    });
  }
}
