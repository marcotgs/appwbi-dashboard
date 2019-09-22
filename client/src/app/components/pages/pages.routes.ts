import { Routes } from "@angular/router";
import { StarterComponent } from './starter/starter.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';

const pageRoutes: Routes = [
    {
        path: 'home',
        component: StarterComponent
    },
    {
        path: 'minha-conta',
        component: ManageAccountComponent
    }
];

export default pageRoutes;
