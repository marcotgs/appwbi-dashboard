import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
    ],
    declarations: [
        DashboardContentComponent,
        HeaderNavigationComponent,
        SidebarComponent,
    ]
})
export class LayoutModule { }