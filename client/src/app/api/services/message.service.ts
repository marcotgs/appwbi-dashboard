import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, MessageBody } from '@shared/interfaces';

@Injectable()
export default class MessageService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/message';
    }

    public postMessage(body: MessageBody): Observable<ApiPayload<boolean>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<boolean>>(`${this.controllerPath}/`, body, { headers });
    }
}