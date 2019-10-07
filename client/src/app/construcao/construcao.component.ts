import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './construcao.component.html'
})
export class ConstrucaoComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'PÁGINA EM CONSTRUÇÃO';
  }

  ngAfterViewInit() {}
}
