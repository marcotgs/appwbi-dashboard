import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    UserService, AuthService, ModuleService,
    AccessPermissionService, RoutineService, 
    ProcessService, SectorService, CompanyService, 
    CompanyBranchService,
    MessageService,
} from './services';
import { ApiHttpInterceptor } from './interceptors/http.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        UserService,
        AuthService,
        ModuleService,
        RoutineService,
        ProcessService,
        SectorService,
        MessageService,
        CompanyService,
        CompanyBranchService,
        AccessPermissionService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHttpInterceptor,
            multi: true,
        },],
})
export class ApiModule { }
