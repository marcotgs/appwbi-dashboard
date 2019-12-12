import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, RoutineResponse, RoutineBody } from '@shared/interfaces';

@Injectable()
export default class RoutineService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/routine';
    }

    public getRoutines(): Observable<ApiPayload<RoutineResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<RoutineResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postRoutine(body: RoutineBody): Observable<ApiPayload<RoutineResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<RoutineResponse>>(`${this.controllerPath}/`, body, { headers });
    }

    public deleteRoutine(id: number): Observable<ApiPayload<RoutineResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<RoutineResponse>>(`${this.controllerPath}/${id}`, { headers });
    }
}