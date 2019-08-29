import { Action } from '@ngrx/store';
import { LoginResponse, LoginBody, ApiResponseErrors } from '@api/interfaces';

export const LOGIN = '[USER] Login';
export const LOGIN_SUCCESS = '[USER] Login success';
export const LOGIN_ERROR = '[USER] Login error';

export class LoginAction implements Action {
    readonly type = LOGIN;
    constructor(public payload: LoginBody) { }
}

export class LoginActionSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: LoginResponse) { }
}

export class LoginActionError implements Action {
    readonly type = LOGIN_ERROR;
    constructor(public payload: ApiResponseErrors) { }
}


export type All = LoginAction | LoginActionSuccess | LoginActionError;