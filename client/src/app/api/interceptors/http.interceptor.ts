import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.search('https') < 0) {
            const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}` });
            return next.handle(apiReq);
        }
        return next.handle(req.clone({ url: `${req.url}` }));
    }
}