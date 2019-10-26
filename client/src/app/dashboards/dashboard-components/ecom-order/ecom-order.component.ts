import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-ecom-order',
  templateUrl: './ecom-order.component.html',
  styleUrls: ['./ecom-order.component.css']
})
export class EcomorderComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    const chart4 = c3.generate({
      bindto: '.status',
      data: {
        columns: [['Success', 65], ['Pending', 15], ['Failed', 17]],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'Orders',
        width: 35
      },

      legend: {
        hide: true
        // or hide: 'data1'
        // or hide: ['data1', 'data2']
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb']
      }
    });
  }
}
