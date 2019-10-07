import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-ecom-product',
  templateUrl: './ecom-product.component.html'
})
export class EcomproductComponent {
  public config: PerfectScrollbarConfigInterface = {};

  constructor() {}
}
