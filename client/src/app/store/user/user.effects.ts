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
        ofType(userActions.login),
        switchMap((action) =>
            this.userService.login(action)
                .pipe(
                    map(res => {
                        this.authService.setSession(res.data);
                        return userActions.loginSuccess(this.authService.decodeToken(res.data.token));
                    }),
                    catchError(res => {
                        return of(userActions.loginError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public sendEmailChangePassword$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.sendEmailChangePassword),
        switchMap((action) =>
            this.userService.sendEmailChangePassword(action)
                .pipe(
                    map(() => {
                        return userActions.sendEmailChangePasswordSuccess();
                    }),
                    catchError(res => of(userActions.sendEmailChangePasswordError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));

    public changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.changePassword),
        switchMap((action) =>
            this.userService.changePassword(action)
                .pipe(
                    map(() => {
                        return userActions.changePasswordSuccess();
                    }),
                    catchError(res => of(userActions.changePasswordError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));

    public getProfile$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.getProfile),
        switchMap(() =>
            this.userService.getUserProfile()
                .pipe(
                    map((response) => {
                        return userActions.getProfileSuccess(response.data);
                    }),
                    catchError(res => of(userActions.getProfileError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));

    public updateProfile$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.updateProfile),
        switchMap((action) =>
            this.userService.updateUserProfile(action)
                .pipe(
                    map((response) => {
                        this.authService.setSession(response.data);
                        return userActions.loginSuccess(this.authService.decodeToken(response.data.token));
                    }),
                    catchError(res => of(userActions.updateProfileError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));
}
