import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsRoutes } from './cards.routing';
import { BasicComponent } from './basic/basic.component';
import { CustomComponent } from './custom/custom.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  imports: [RouterModule.forChild(CardsRoutes)],
  declarations: [BasicComponent, CustomComponent, WeatherComponent]
})
export class CardsModule {}
