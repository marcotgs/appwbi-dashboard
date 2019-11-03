import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as companyActions from '@app/store/company/company.actions';
import { CompanyService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class CompanyEffects {

    constructor(
        private actions$: Actions,
        private companyService: CompanyService,
    ) { }

    public getCompany$ = createEffect(() => this.actions$.pipe(
        ofType(companyActions.getCompanies),
        switchMap(() =>
            this.companyService.getCompanies()
                .pipe(
                    map(res => {
                        return companyActions.getCompaniesSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(companyActions.getCompaniesError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postCompany$ = createEffect(() => this.actions$.pipe(
        ofType(companyActions.postCompany),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.companyService.postCompany(body)
                .pipe(
                    map(res => {
                        if(action.id){
                            return companyActions.postCompanyEditSuccess(res.data);
                        }
                        return companyActions.postCompanySuccess(res.data);
                    }),
                    catchError(res => {
                        return of(companyActions.postCompanyError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteCompany$ = createEffect(() => this.actions$.pipe(
        ofType(companyActions.deleteCompany),
        switchMap((action) =>
            this.companyService.deleteCompany(action.id)
                .pipe(
                    map(() => {
                        return companyActions.deleteCompanySuccess(action);
                    }),
                    catchError(res => {
                        return of(companyActions.deleteCompanyError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
