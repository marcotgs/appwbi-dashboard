import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthTokenService } from '@app/services';
import { ApiPayload, acessoUsuariosResponse, LoginResponse } from '@shared/interfaces';

@Injectable()
export default class UserService {
    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/user';
    }

    public getUserProfile(): Observable<ApiPayload<acessoUsuariosResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<acessoUsuariosResponse>>(`${this.controllerPath}/profile`, { headers });
    }

    public updateUserProfile(newUserData: acessoUsuariosResponse): Observable<ApiPayload<LoginResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        const payload = { ...newUserData };
        if (payload.password) {
            payload.password = sha1(payload.password).toString();
        }
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerPath}/profile`,
            payload, { headers });
    }
}