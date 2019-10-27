import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as accessPermissionActions from '@app/store/access-permission/access-permission.actions';
import { AccessPermissionService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class AccessPermissionEffects {

    constructor(
        private actions$: Actions,
        private accessPermissionService: AccessPermissionService,
    ) { }

    public getMenuPermissions$ = createEffect(() => this.actions$.pipe(
        ofType(accessPermissionActions.getMenuPermissions),
        switchMap(() =>
            this.accessPermissionService.getMenuPermissions()
                .pipe(
                    map(res => {
                        return accessPermissionActions.getMenuPermissionsSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(accessPermissionActions.getMenuPermissionsError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public getPermissions$ = createEffect(() => this.actions$.pipe(
        ofType(accessPermissionActions.getPermissions),
        switchMap(() =>
            this.accessPermissionService.getPermissions()
                .pipe(
                    map(res => {
                        return accessPermissionActions.getPermissionsSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(accessPermissionActions.getPermissionsError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
