import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, CompanyResponse, CompanyBody } from '@shared/interfaces';

@Injectable()
export default class CompanyService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/company';
    }

    public getCompanies(): Observable<ApiPayload<CompanyResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<CompanyResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postCompany(body: CompanyBody): Observable<ApiPayload<CompanyResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<CompanyResponse>>(`${this.controllerPath}/`, body, { headers });
    }

    public deleteCompany(id: number): Observable<ApiPayload<CompanyResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<CompanyResponse>>(`${this.controllerPath}/${id}`, { headers });
    }
}