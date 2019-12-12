import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as routineActions from '@app/store/routine/routine.actions';
import { RoutineService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class RoutineEffects {

    constructor(
        private actions$: Actions,
        private routineService: RoutineService,
    ) { }

    public getRoutines$ = createEffect(() => this.actions$.pipe(
        ofType(routineActions.getRoutines),
        switchMap(() =>
            this.routineService.getRoutines()
                .pipe(
                    map(res => {
                        return routineActions.getRoutinesSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(routineActions.getRoutinesError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postRoutine$ = createEffect(() => this.actions$.pipe(
        ofType(routineActions.postRoutine),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.routineService.postRoutine(body)
                .pipe(
                    map(res => {
                        if(action.id){
                            return routineActions.postRoutineEditSuccess(res.data);
                        }
                        return routineActions.postRoutineSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(routineActions.postRoutineError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteRoutine$ = createEffect(() => this.actions$.pipe(
        ofType(routineActions.deleteRoutine),
        switchMap((action) =>
            this.routineService.deleteRoutine(action.id)
                .pipe(
                    map(() => {
                        return routineActions.deleteRoutineSuccess(action);
                    }),
                    catchError(res => {
                        return of(routineActions.deleteRoutineError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
