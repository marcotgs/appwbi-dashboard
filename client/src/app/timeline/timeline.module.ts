import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TimelineRoutes } from './timeline.routing';
import { CenterComponent } from './center/center.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TimelineRoutes)],
  declarations: [CenterComponent, LeftComponent, RightComponent]
})
export class TimelineModule {}
