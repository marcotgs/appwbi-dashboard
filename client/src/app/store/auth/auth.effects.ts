import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as authActions from '@app/store/auth/auth.actions';
import { AuthService } from '@api/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }

    public getPermissions$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.getPermissions),
        switchMap(() =>
            this.authService.getMenuPermissions()
                .pipe(
                    map(res => {
                        return authActions.getPermissionsSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(authActions.getPermissionsError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));
}
