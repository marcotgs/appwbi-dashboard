import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
declare var $: any;

@Component({
    selector: 'dashboard-content',
    templateUrl: './dashboard-content.component.html',
    styleUrls: ['./dashboard-content.component.scss'],
})
export class DashboardContentComponent implements OnInit {
    public config: PerfectScrollbarConfigInterface = {};
    public tabStatus = 'justified';
    public isCollapsed = false;
    public innerWidth: any;
    public defaultSidebar: any;
    public showSettings = false;
    public showMobileMenu = false;
    public expandLogo = false;
    public options = {
        theme: 'light', // two possible values: light, dark
        dir: 'ltr', // two possible values: ltr, rtl
        layout: 'vertical', // fixed value. shouldn't be changed.
        sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
        sidebarpos: 'fixed', // two possible values: fixed, absolute
        headerpos: 'fixed', // two possible values: fixed, absolute
        boxed: 'full', // two possible values: full, boxed
        navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
        sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
        logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
    };

    constructor(public router: Router) { }

    ngOnInit() {
        this.defaultSidebar = this.options.sidebartype;
        this.handleSidebar();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.handleSidebar();
    }

    public Logo() {
        this.expandLogo = !this.expandLogo;
    }

    public handleSidebar() {
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

    public toggleSidebarType() {
        switch (this.options.sidebartype) {
            case 'full':
            case 'iconbar':
                this.options.sidebartype = 'mini-sidebar';
                break;

            case 'overlay':
                this.showMobileMenu = !this.showMobileMenu;
                break;

            case 'mini-sidebar':
                if (this.defaultSidebar === 'mini-sidebar') {
                    this.options.sidebartype = 'full';
                } else {
                    this.options.sidebartype = this.defaultSidebar;
                }
                break;

            default:
        }
    }
}
