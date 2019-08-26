import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { LoginBody, ApiPayload, LoginResponse } from '@api/interfaces';

@Injectable()
export default class UserService {

    private controllerUser: string;
    constructor(private http: HttpClient) {
        this.controllerUser = '/user';
    }

    public login(loginForm: LoginBody): Observable<ApiPayload<LoginResponse>> {
        const hashPassword = sha1(loginForm.password).toString();
        return this.http.post(`${this.controllerUser}/login`, { ...loginForm, password: hashPassword });
    }
}