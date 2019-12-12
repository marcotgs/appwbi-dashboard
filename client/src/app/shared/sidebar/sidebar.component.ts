import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccessPermissionState, getAccessPermissionState } from '@app/store/access-permission';
import { RouteInfo } from './sidebar.metadata';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private store: Store<AccessPermissionState>,
  ) { }

  // End open close
  ngOnInit() {
    this.store.select(getAccessPermissionState)
      .subscribe((data) => {
        if (data.menuPermissions) {
          this.sidebarnavItems = data.menuPermissions.map(m => {
            return {
              title: m.descricao,
              icon: m.icone,
              class: 'has-arrow',
              extralink: false,
              submenu: m.cadastroRotinas.map(r => {
                return {
                  title: r.descricao,
                  icon: r.icone,
                  class: 'has-arrow',
                  extralink: false,
                  submenu: r.cadastroProcessos.map(p => {
                    return {
                      path: `/${p.funcao}`,
                      title: p.descricao,
                      icon: p.icone,
                      class: '',
                      extralink: false,
                      submenu: []
                    }
                  })
                };
              })
            } as RouteInfo;
          });
        }
      });
  }
}
