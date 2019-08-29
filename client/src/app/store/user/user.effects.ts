import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '@app/store/user/user.actions';
import { UserService } from '@api/services';
import { AuthService } from '@app/services';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authService: AuthService,
    ) { }

    public userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(LOGIN),
        switchMap((action: any) =>
            this.userService.login(action.payload)
                .pipe(
                    map(res => {
                        this.authService.setSession(res.data);
                        return { type: LOGIN_SUCCESS, payload: res.data };
                    }),
                    catchError(res => of({ type: LOGIN_ERROR, payload: res.error.data }))
                )
        )
    ));
}