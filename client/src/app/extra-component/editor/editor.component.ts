import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './editor.component.html'
})
export class EditorComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
