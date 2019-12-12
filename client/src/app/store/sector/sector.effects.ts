import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as sectorActions from '@app/store/sector/sector.actions';
import { SectorService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class SectorEffects {

    constructor(
        private actions$: Actions,
        private sectorService: SectorService,
    ) { }

    public getSector$ = createEffect(() => this.actions$.pipe(
        ofType(sectorActions.getSector),
        switchMap(() =>
            this.sectorService.getSectors()
                .pipe(
                    map(res => {
                        return sectorActions.getSectorSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(sectorActions.getSectorError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public postSector$ = createEffect(() => this.actions$.pipe(
        ofType(sectorActions.postSector),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.sectorService.postSector(body)
                .pipe(
                    map(res => {
                        if(action.id){
                            return sectorActions.postSectorEditSuccess(res.data);
                        }
                        return sectorActions.postSectorSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(sectorActions.postSectorError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));

    public deleteSector$ = createEffect(() => this.actions$.pipe(
        ofType(sectorActions.deleteSector),
        switchMap((action) =>
            this.sectorService.deleteSector(action.id)
                .pipe(
                    map(() => {
                        return sectorActions.deleteSectorSuccess(action);
                    }),
                    catchError(res => {
                        return of(sectorActions.deleteSectorError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
