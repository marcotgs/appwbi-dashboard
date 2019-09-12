import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
};

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule.forChild([]),
        PerfectScrollbarModule
    ],
    declarations: [
        DashboardContentComponent,
        HeaderNavigationComponent,
        SidebarComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ],
})
export class LayoutModule { }