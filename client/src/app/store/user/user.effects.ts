import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as userActions from '@app/store/user/user.actions';
import { UserService } from '@api/services';
import { AuthService } from '@app/services';
import { ApiConstants } from '@app/constants/api';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authService: AuthService,
    ) { }

    public userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.LOGIN),
        switchMap((action: any) =>
            this.userService.login(action.payload)
                .pipe(
                    map(res => {
                        this.authService.setSession(res.data);
                        return { type: userActions.LOGIN_SUCCESS, payload: res.data };
                    }),
                    catchError(res => of({
                        type: userActions.LOGIN_ERROR,
                        payload: (res.error.data || { errors: [ApiConstants.UNEXPECTED_ERROR] })
                    }))
                )
        )
    ));

    public sendEmailChangePassword$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.EMAIL_CHANGE_PASSWORD),
        switchMap((action: any) =>
            this.userService.sendEmailChangePassword(action.payload)
                .pipe(
                    map(() => {
                        return { type: userActions.EMAIL_CHANGE_PASSWORD_SUCCESS };
                    }),
                    catchError(res => of({
                        type: userActions.EMAIL_CHANGE_PASSWORD_ERROR,
                        payload: (res.error.data || { errors: [ApiConstants.UNEXPECTED_ERROR] })
                    }))
                )
        )
    ));

    public changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.CHANGE_PASSWORD),
        switchMap((action: any) =>
            this.userService.changePassword(action.payload)
                .pipe(
                    map(() => {
                        return { type: userActions.CHANGE_PASSWORD_SUCCESS };
                    }),
                    catchError(res => of({
                        type: userActions.CHANGE_PASSWORD_ERROR,
                        payload: (res.error.data || { errors: [ApiConstants.UNEXPECTED_ERROR] })
                    }))
                )
        )
    ));
}