import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import sha1 from "crypto-js/sha1";
import { AuthTokenService } from '@app/services';
import { ApiPayload, UserResponse, LoginResponse, UserBody } from '@shared/interfaces';

@Injectable()
export default class UserService {
    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/user';
    }

    public getUserProfile(): Observable<ApiPayload<UserResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<UserResponse>>(`${this.controllerPath}/profile`, { headers });
    }

    public getUsers(): Observable<ApiPayload<UserResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<UserResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postUser(body: UserBody): Observable<ApiPayload<UserResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        const payload = { ...body };
        if (payload.password) {
            payload.password = sha1(payload.password).toString();
        }
        return this.http.post<ApiPayload<UserResponse>>(`${this.controllerPath}/`, payload, { headers });
    }

    public deleteUser(id: number): Observable<ApiPayload<UserResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<UserResponse>>(`${this.controllerPath}/${id}`, { headers });
    }

    public updateUserProfile(newUserData: UserResponse): Observable<ApiPayload<LoginResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        const payload = { ...newUserData };
        if (payload.password) {
            payload.password = sha1(payload.password).toString();
        }
        return this.http.post<ApiPayload<LoginResponse>>(`${this.controllerPath}/profile`,
            payload, { headers });
    }
}