import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthTokenService } from '@app/services';
import { ApiPayload, acessoUsuariosResponse, LoginResponse, SendEmailChangePasswordBody, ChangePasswordBody, MenuPermissionsResponse } from '@shared/interfaces';
import { LoginBody } from '../interfaces';

@Injectable()
export default class AuthService {

    private controllerUser: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerUser = '/auth';
    }

    public login(loginForm: LoginBody): Observable<ApiPayload<LoginResponse>> {
        const hashPassword = sha1(loginForm.password).toString();
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerUser}/login`, { ...loginForm, password: hashPassword });
    }

    public sendEmailChangePassword(body: SendEmailChangePasswordBody): Observable<ApiPayload<void>> {
        return this.http.post<ApiPayload<void>>(`${this.controllerUser}/sendEmailChangePassword`, body);
    }

    public changePassword(body: ChangePasswordBody): Observable<ApiPayload<void>> {
        const hashNewPassword = sha1(body.newPassword).toString();
        return this.http.put<ApiPayload<void>>(`${this.controllerUser}/changePassword`, { ...body, newPassword: hashNewPassword });
    }

    public getMenuPermissions(): Observable<ApiPayload<MenuPermissionsResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<MenuPermissionsResponse[]>>(`${this.controllerUser}/menu-permissions`, { headers });
    }
}