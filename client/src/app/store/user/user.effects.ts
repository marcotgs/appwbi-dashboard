import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as userActions from '@app/store/user/user.actions';
import { UserService, AuthService } from '@api/services';
import { ApiConstants } from '@app/constants/api';
import { AuthTokenService } from '@app/services';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authService: AuthService,
        private authTokenService: AuthTokenService,
    ) { }

    public userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.login),
        switchMap((action) =>
            this.authService.login(action)
                .pipe(
                    map(res => {
                        this.authTokenService.setSession(res.data);
                        return userActions.loginSuccess(this.authTokenService.decodeToken(res.data.token));
                    }),
                    catchError(res => {
                        return of(userActions.loginError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        )));

    public sendEmailChangePassword$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.sendEmailChangePassword),
        switchMap((action) =>
            this.authService.sendEmailChangePassword(action)
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
            this.authService.changePassword(action)
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
                        this.authTokenService.setSession(response.data);
                        return userActions.loginSuccess(this.authTokenService.decodeToken(response.data.token));
                    }),
                    catchError(res => of(userActions.updateProfileError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));

    public getUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.getUsers),
        switchMap(() =>
            this.userService.getUsers()
                .pipe(
                    map((response) => {
                        return userActions.getUsersSuccess(response.data);
                    }),
                    catchError(res => of(userActions.getUsersError((
                        (res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] }
                    ))))
                )
        )
    ));

    public postUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.postUser),
        switchMap((action) => {
            const body = { ...action };
            delete body.type;
            return this.userService.postUser(body)
                .pipe(
                    map(res => {
                        if (action.id) {
                            return userActions.postUserEditSuccess(res.data);
                        }
                        return userActions.postUserSuccess(res.data);
                    }),
                    catchError(res => {
                        return of(userActions.postUserError(((res.error && res.error.data) || { errors: [ApiConstants.UNEXPECTED_ERROR] })));
                    })
                )
        })));
}
