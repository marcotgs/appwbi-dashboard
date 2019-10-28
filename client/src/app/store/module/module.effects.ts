import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moduleActions from '@app/store/module/module.actions';
import { ModuleService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class ModuleEffects {

    constructor(
        private actions$: Actions,
        private moduleService: ModuleService,
    ) { }

    public getModules$ = createEffect(() => this.actions$.pipe(
        ofType(moduleActions.getModules),
        switchMap(() =>
            this.moduleService.getModules()
                .pipe(
                    map(res => {
                        return moduleActions.getModulesSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(moduleActions.getModulesError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postModule$ = createEffect(() => this.actions$.pipe(
        ofType(moduleActions.postModule),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.moduleService.postModule(body)
                .pipe(
                    map(res => {
                        return moduleActions.postModuleSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(moduleActions.postModuleError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteModules$ = createEffect(() => this.actions$.pipe(
        ofType(moduleActions.deleteModule),
        switchMap((action) =>
            this.moduleService.deleteModule(action.id)
                .pipe(
                    map(() => {
                        return moduleActions.deleteModuleSuccess(action);
                    }),
                    catchError(res => {
                        return of(moduleActions.deleteModuleError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
