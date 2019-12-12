import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as processActions from '@app/store/process/process.actions';
import { ProcessService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class ProcessEffects {

    constructor(
        private actions$: Actions,
        private processService: ProcessService,
    ) { }

    public getProcess$ = createEffect(() => this.actions$.pipe(
        ofType(processActions.getProcess),
        switchMap(() =>
            this.processService.getProcess()
                .pipe(
                    map(res => {
                        return processActions.getProcessSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(processActions.getProcessError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postProcess$ = createEffect(() => this.actions$.pipe(
        ofType(processActions.postProcess),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.processService.postProcess(body)
                .pipe(
                    map(res => {
                        if(action.id){
                            return processActions.postProcessEditSuccess(res.data);
                        }
                        return processActions.postProcessSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(processActions.postProcessError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteProcess$ = createEffect(() => this.actions$.pipe(
        ofType(processActions.deleteProcess),
        switchMap((action) =>
            this.processService.deleteProcess(action.id)
                .pipe(
                    map(() => {
                        return processActions.deleteProcessSuccess(action);
                    }),
                    catchError(res => {
                        return of(processActions.deleteProcessError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
