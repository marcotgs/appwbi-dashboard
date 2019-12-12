import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthTokenService } from '@app/services';
import { ApiPayload, LoginResponse, SendEmailChangePasswordBody, ChangePasswordBody, MenuPermissionsResponse } from '@shared/interfaces';
import { LoginBody } from '../interfaces';

@Injectable()
export default class AuthService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/auth';
    }

    public login(loginForm: LoginBody): Observable<ApiPayload<LoginResponse>> {
        const hashPassword = sha1(loginForm.password).toString();
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerPath}/login`, { ...loginForm, password: hashPassword });
    }

    public sendEmailChangePassword(body: SendEmailChangePasswordBody): Observable<ApiPayload<void>> {
        return this.http.post<ApiPayload<void>>(`${this.controllerPath}/sendEmailChangePassword`, body);
    }

    public changePassword(body: ChangePasswordBody): Observable<ApiPayload<void>> {
        const hashNewPassword = sha1(body.newPassword).toString();
        return this.http.put<ApiPayload<void>>(`${this.controllerPath}/changePassword`, { ...body, newPassword: hashNewPassword });
    }

    public getMenuPermissions(): Observable<ApiPayload<MenuPermissionsResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<MenuPermissionsResponse[]>>(`${this.controllerPath}/menu-permissions`, { headers });
    }
}