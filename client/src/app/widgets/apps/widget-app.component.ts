import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  templateUrl: 'widget-app.component.html'
})
export class WidgetappComponent {
	public config: PerfectScrollbarConfigInterface = {};
}
