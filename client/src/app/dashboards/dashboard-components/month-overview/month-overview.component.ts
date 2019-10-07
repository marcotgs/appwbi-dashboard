import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-month-overview',
  templateUrl: './month-overview.component.html',
  styleUrls: ['./month-overview.component.css']
})
export class MonthoverviewComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '.overview1',
      data: {
        columns: [
          ['Site A', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          ['Site B', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        ],
        type: 'line'
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
        r: 4
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#2961ff', '#dadada', '#ff821c', '#7e74fb']
      }
    });

    const chart3 = c3.generate({
      bindto: '.rate',
      data: {
        columns: [['Conversation', 85], ['other', 15]],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Coversation',
        width: 10
      },
      padding: {
        top: 10,
        bottom: -20
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#2961ff', '#dadada', '#ff821c', '#7e74fb']
      }
    });

    const chart4 = c3.generate({
      bindto: '.earnings',
      data: {
        columns: [
          ['Site A', 0, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8]
        ],
        type: 'spline'
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
        right: 10,
        bottom: 0,
        left: 20
      },
      point: {
        r: 0
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#fff', '#ff821c', '#ff821c', '#7e74fb']
      }
    });

    (<any>$('#activeu')).sparkline(
      [6, 10, 9, 11, 9, 10, 12, 11, 10, 9, 11, 9, 10],
      {
        type: 'bar',
        height: '122',
        barWidth: '4',
        width: '100%',
        resize: true,
        barSpacing: '11',
        barColor: '#fff'
      }
    );
  }
}
