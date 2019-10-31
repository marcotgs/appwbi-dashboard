import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, ProcessResponse, ProcessBody } from '@shared/interfaces';

@Injectable()
export default class ProcessService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/process';
    }

    public getProcess(): Observable<ApiPayload<ProcessResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<ProcessResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postProcess(body: ProcessBody): Observable<ApiPayload<ProcessResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<ProcessResponse>>(`${this.controllerPath}/`, body, { headers });
    }

    public deleteProcess(id: number): Observable<ApiPayload<ProcessResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<ProcessResponse>>(`${this.controllerPath}/${id}`, { headers });
    }
}