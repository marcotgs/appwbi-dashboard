import { Action } from '@ngrx/store';
import { LoginResponse, LoginBody, ApiResponseErrors, ChangePasswordBody } from '@api/interfaces';

export const LOGIN = '[USER] Login';
export const LOGIN_SUCCESS = '[USER] Login success';
export const LOGIN_ERROR = '[USER] Login error';

export const EMAIL_CHANGE_PASSWORD = '[USER] Send Email Change Password';
export const EMAIL_CHANGE_PASSWORD_SUCCESS = '[USER] Send Email Change Password success';
export const EMAIL_CHANGE_PASSWORD_ERROR = '[USER] Send Email Change Passwordd error';

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

export class SendEmailChangePasswordAction implements Action {
    readonly type = EMAIL_CHANGE_PASSWORD;
    constructor(public payload: ChangePasswordBody) { }
}

export class SendEmailChangePasswordActionSuccess implements Action {
    readonly type = EMAIL_CHANGE_PASSWORD_SUCCESS;
    constructor() { }
}

export class SendEmailChangePasswordActionError implements Action {
    readonly type = EMAIL_CHANGE_PASSWORD_ERROR;
    constructor(public payload: ApiResponseErrors) { }
}


export type All = LoginAction | LoginActionSuccess | LoginActionError
| SendEmailChangePasswordAction | SendEmailChangePasswordActionSuccess | SendEmailChangePasswordActionError;