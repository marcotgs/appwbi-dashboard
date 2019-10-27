import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, MenuPermissionsResponse, PermissionResponse } from '@shared/interfaces';

@Injectable()
export default class AccessPermissionService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/access-permission';
    }

    public getMenuPermissions(): Observable<ApiPayload<MenuPermissionsResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<MenuPermissionsResponse[]>>(`${this.controllerPath}/menu-permissions`, { headers });
    }

    public getPermissions(): Observable<ApiPayload<PermissionResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<PermissionResponse[]>>(`${this.controllerPath}/`, { headers });
    }
}