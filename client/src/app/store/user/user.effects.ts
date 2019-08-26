import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LOGIN } from '@app/store/user/';
import { UserService } from '@api/services/';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    public userLogin$ = createEffect(() => this.actions$.pipe(
        ofType(LOGIN),
        switchMap((action: any) =>
            this.userService.login(action.payload)
                .pipe(
                    map(auth => ({ type: '[Movies API] Movies Loaded Success', payload: auth })),
                    catchError(() => EMPTY)
                )
        )
    ));
}