import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, SectorResponse, SectorBody } from '@shared/interfaces';

@Injectable()
export default class SectorService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/sector';
    }

    public getSectors(): Observable<ApiPayload<SectorResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<SectorResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postSector(body: SectorBody): Observable<ApiPayload<SectorResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<SectorResponse>>(`${this.controllerPath}/`, body, { headers });
    }

    public deleteSector(id: number): Observable<ApiPayload<SectorResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<SectorResponse>>(`${this.controllerPath}/${id}`, { headers });
    }
}