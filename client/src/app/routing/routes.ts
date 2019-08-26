import { Routes } from "@angular/router";
import { AppComponent } from '../app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        loadChildren:
            () => import('../components/authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];

export default routes;