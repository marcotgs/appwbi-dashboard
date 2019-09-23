import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import {
    LoginBody, ApiPayload, LoginResponse,
    ChangePasswordBody, SendEmailChangePasswordBody, acessoUsuariosModel
} from '@api/interfaces';
import { AuthService } from '@app/services';

@Injectable()
export default class UserService {

    private controllerUser: string;
    constructor(private http: HttpClient, private auth: AuthService) {
        this.controllerUser = '/user';
    }

    public getUserProfile(): Observable<ApiPayload<acessoUsuariosModel>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
        return this.http.get(`${this.controllerUser}/profile`, { headers });
    }

    public updateUserProfile(newUserData: acessoUsuariosModel): Observable<ApiPayload<LoginResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
        return this.http.post(`${this.controllerUser}/profile`, newUserData, { headers });
    }

    public login(loginForm: LoginBody): Observable<ApiPayload<LoginResponse>> {
        const hashPassword = sha1(loginForm.password).toString();
        return this.http.post(`${this.controllerUser}/login`, { ...loginForm, password: hashPassword });
    }

    public sendEmailChangePassword(body: SendEmailChangePasswordBody): Observable<ApiPayload<void>> {
        return this.http.post(`${this.controllerUser}/sendEmailChangePassword`, body);
    }

    public changePassword(body: ChangePasswordBody): Observable<ApiPayload<void>> {
        const hashNewPassword = sha1(body.newPassword).toString();
        return this.http.put(`${this.controllerUser}/changePassword`, { ...body, newPassword: hashNewPassword });
    }
}