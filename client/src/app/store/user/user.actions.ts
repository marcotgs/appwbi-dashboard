import { Action } from '@ngrx/store';
import { LoginResponse, LoginBody } from '@api/interfaces';

export const LOGIN = '[USER] Login';
export const LOGIN_SUCCESS = '[USER] Login success';

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(public payload: LoginBody) { }
}

export class LoginActionSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: LoginResponse) {
        console.log(payload);
    }
}

export type All = LoginAction | LoginActionSuccess;