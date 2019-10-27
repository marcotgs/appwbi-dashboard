import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthTokenService } from '@app/services';
import { ApiPayload, acessoUsuariosResponse, LoginResponse, SendEmailChangePasswordBody, ChangePasswordBody } from '@shared/interfaces';
import { LoginBody } from '../interfaces';

@Injectable()
export default class UserService {
    private controllerUser: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerUser = '/user';
    }

    public getUserProfile(): Observable<ApiPayload<acessoUsuariosResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<acessoUsuariosResponse>>(`${this.controllerUser}/profile`, { headers });
    }

    public updateUserProfile(newUserData: acessoUsuariosResponse): Observable<ApiPayload<LoginResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        const payload = { ...newUserData };
        if (payload.password) {
            payload.password = sha1(payload.password).toString();
        }
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerUser}/profile`,
            payload, { headers });
    }
}