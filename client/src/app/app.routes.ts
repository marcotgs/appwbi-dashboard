import { Routes } from "@angular/router";
import { DashboardContentComponent } from '@app/components/layout/dashboard-content/dashboard-content.component';
import { AuthGuard } from '@app/components/authentication/auth.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: DashboardContentComponent,
        canActivate: [AuthGuard],
        loadChildren:
            () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: '**',
        redirectTo: '/login'
    },
];