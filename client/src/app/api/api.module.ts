import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserService, AuthService, ModuleService } from './services';
import { ApiHttpInterceptor } from './interceptors/http.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        UserService,
        AuthService,
        ModuleService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHttpInterceptor,
            multi: true,
        },],
})
export class ApiModule { }
