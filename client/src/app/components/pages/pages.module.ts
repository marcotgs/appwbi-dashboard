import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import pageRoutes from './pages.routes';

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forChild(pageRoutes)],
    declarations: [StarterComponent]
})
export class PagesModule { }
