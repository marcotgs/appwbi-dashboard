import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, ModuleResponse, ModuleBody } from '@shared/interfaces';

@Injectable()
export default class ModuleService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/module';
    }

    public getModules(): Observable<ApiPayload<ModuleResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<ModuleResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postModule(body: ModuleBody): Observable<ApiPayload<ModuleResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<ModuleResponse>>(`${this.controllerPath}/`, body, { headers });
    }
}