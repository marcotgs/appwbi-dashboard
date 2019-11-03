import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '@app/services';
import { ApiPayload, CompanyBranchResponse, CompanyBranchBody } from '@shared/interfaces';

@Injectable()
export default class CompanyBranchService {

    private controllerPath: string;
    constructor(private http: HttpClient, private authToken: AuthTokenService) {
        this.controllerPath = '/company-branch';
    }

    public getCompaniesBranchs(): Observable<ApiPayload<CompanyBranchResponse[]>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.get<ApiPayload<CompanyBranchResponse[]>>(`${this.controllerPath}/`, { headers });
    }

    public postCompanyBranch(body: CompanyBranchBody): Observable<ApiPayload<CompanyBranchResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.post<ApiPayload<CompanyBranchResponse>>(`${this.controllerPath}/`, body, { headers });
    }

    public deleteCompanyBranch(id: number): Observable<ApiPayload<CompanyBranchResponse>> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken.getToken()}`);
        return this.http.delete<ApiPayload<CompanyBranchResponse>>(`${this.controllerPath}/${id}`, { headers });
    }
}