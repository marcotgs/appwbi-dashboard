import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';

import { MapRoutes } from './maps.routing';
import { MapgoogleComponent } from './map-google/map-google.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MapRoutes), AgmCoreModule],
  declarations: [MapgoogleComponent]
})
export class MapsModule {}
