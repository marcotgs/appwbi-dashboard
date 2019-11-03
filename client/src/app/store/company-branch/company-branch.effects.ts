import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as companyBranchActions from '@app/store/company-branch/company-branch.actions';
import { CompanyBranchService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class CompanyBranchEffects {

    constructor(
        private actions$: Actions,
        private companyBranchService: CompanyBranchService,
    ) { }

    public getCompanyBranch$ = createEffect(() => this.actions$.pipe(
        ofType(companyBranchActions.getCompaniesBranchs),
        switchMap(() =>
            this.companyBranchService.getCompaniesBranchs()
                .pipe(
                    map(res => {
                        return companyBranchActions.getCompaniesBranchsSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(companyBranchActions.getCompaniesBranchsError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postCompanyBranch$ = createEffect(() => this.actions$.pipe(
        ofType(companyBranchActions.postCompanyBranch),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.companyBranchService.postCompanyBranch(body)
                .pipe(
                    map(res => {
                        if(action.id){
                            return companyBranchActions.postCompanyBranchEditSuccess(res.data);
                        }
                        return companyBranchActions.postCompanyBranchSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(companyBranchActions.postCompanyBranchError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteCompanyBranch$ = createEffect(() => this.actions$.pipe(
        ofType(companyBranchActions.deleteCompanyBranch),
        switchMap((action) =>
            this.companyBranchService.deleteCompanyBranch(action.id)
                .pipe(
                    map(() => {
                        return companyBranchActions.deleteCompanyBranchSuccess(action);
                    }),
                    catchError(res => {
                        return of(companyBranchActions.deleteCompanyBranchError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
