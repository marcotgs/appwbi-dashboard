import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// declare var $: any;

@Component({
    selector: 'dashboard-content',
    templateUrl: './dashboard-content.component.html',
})
export class DashboardContentComponent implements OnInit {
    // public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router) { }

    tabStatus = 'justified';

    public isCollapsed = false;

    public innerWidth: any;
    public defaultSidebar: any;
    public showSettings = false;
    public showMobileMenu = false;

    options = {
        theme: 'light', // two possible values: light, dark
        dir: 'ltr', // two possible values: ltr, rtl
        layout: 'horizontal', // fixed value. shouldn't be changed.
        sidebartype: 'full', // fixed value. shouldn't be changed.
        sidebarpos: 'absolute', // two possible values: fixed, absolute
        headerpos: 'absolute', // two possible values: fixed, absolute
        boxed: 'boxed', // two possible values: full, boxed
        navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
        sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
        logobg: 'skin1' // six possible values: skin(1/2/3/4/5/6)
    };

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard/classic']);
        }
        this.defaultSidebar = this.options.sidebartype;
        this.handleSidebar();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.handleSidebar();
    }

    handleSidebar() {
        this.innerWidth = window.innerWidth;
        switch (this.defaultSidebar) {
            case 'full':
                if (this.innerWidth < 1170) {
                    this.options.sidebartype = 'mini-sidebar';
                } else {
                    this.options.sidebartype = this.defaultSidebar;
                }
                break;
            default:
        }
    }
}
