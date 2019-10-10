import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthService } from '@app/services';
import { ApiPayload, acessoUsuariosResponse, LoginResponse, SendEmailChangePasswordBody, ChangePasswordBody } from '@shared/interfaces';
import { LoginBody } from '../interfaces';

@Injectable()
export default class UserService {

    private controllerUser: string;
    constructor(private http: HttpClient, private auth: AuthService) {
        this.controllerUser = '/user';
    }

    public getUserProfile(): Observable<ApiPayload<acessoUsuariosResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
        return this.http.get<ApiPayload<acessoUsuariosResponse>>(`${this.controllerUser}/profile`, { headers });
    }

    public updateUserProfile(newUserData: acessoUsuariosResponse): Observable<ApiPayload<LoginResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
        const payload = { ...newUserData };
        if (payload.password) {
            payload.password = sha1(payload.password).toString();
        }
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerUser}/profile`,
        payload,
            { headers });
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
}