import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '#poll',
      data: {
        columns: [['A', 30], ['B', 15], ['C', 27], ['D', 18], ['None', 45]],

        type: 'donut',
        onclick: function(d, i) {
          console.log('onclick', d, i);
        },
        onmouseover: function(d, i) {
          console.log('onmouseover', d, i);
        },
        onmouseout: function(d, i) {
          console.log('onmouseout', d, i);
        }
      },
      donut: {
        label: {
          show: false
        },
        title: 'Ans: A',
        width: 15
      },

      legend: {
        hide: true
        // or hide: 'data1'
        // or hide: ['data1', 'data2']
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#4CAF50', '#e9edf2']
      }
    });
  }
}
