import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-realtime-visit',
  templateUrl: './realtime-visit.component.html',
  styleUrls: ['./realtime-visit.component.css']
})
export class RealtimevisitComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '#placeholder',
      data: {
        columns: [
          ['Site A', 30, 400, 100, 400, 150, 275, 135, 200, 218],
          ['Site B', 130, 340, 200, 350, 250, 130, 189, 153, 258]
        ],
        type: 'area-spline'
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
      legend: {
        hide: true
      },
      color: {
        pattern: ['#2961ff', '#40c4ff']
      }
    });
  }
}
