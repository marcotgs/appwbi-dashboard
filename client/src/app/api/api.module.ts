import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserService } from './services';
import { ApiHttpInterceptor } from './interceptors/http.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHttpInterceptor,
            multi: true,
        },],
})
export class ApiModule { }
