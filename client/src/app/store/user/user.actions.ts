import { props, createAction } from '@ngrx/store';
import * as userTypes from "./user.types";
import { LoginBody, ApiResponseErrors, ChangePasswordBody, SendEmailChangePasswordBody, acessoUsuariosModel, municipioModel } from '@api/interfaces';

export const login = createAction(
    userTypes.LOGIN,
    props<LoginBody>()
);

export const loginSuccess = createAction(
    userTypes.LOGIN_SUCCESS,
    props<{ email: string, nome: string }>()
);

export const loginError = createAction(
    userTypes.LOGIN_ERROR,
    props<ApiResponseErrors>()
);

export const logout = createAction(
    userTypes.LOGOUT,
);

export const sendEmailChangePassword = createAction(
    userTypes.EMAIL_CHANGE_PASSWORD,
    props<SendEmailChangePasswordBody>()
);

export const sendEmailChangePasswordSuccess = createAction(
    userTypes.EMAIL_CHANGE_PASSWORD_SUCCESS,
);

export const sendEmailChangePasswordError = createAction(
    userTypes.EMAIL_CHANGE_PASSWORD_ERROR,
    props<ApiResponseErrors>(),
);

export const changePassword = createAction(
    userTypes.CHANGE_PASSWORD,
    props<ChangePasswordBody>()
);

export const changePasswordSuccess = createAction(
    userTypes.CHANGE_PASSWORD_SUCCESS,
);

export const changePasswordError = createAction(
    userTypes.CHANGE_PASSWORD_ERROR,
    props<ApiResponseErrors>(),
);

export const getProfile = createAction(
    userTypes.GET_PROFILE,
);

export const getProfileSuccess = createAction(
    userTypes.GET_PROFILE_SUCCESS,
    props<acessoUsuariosModel>()
);

export const getProfileError = createAction(
    userTypes.GET_PROFILE_ERROR,
    props<ApiResponseErrors>(),
);

export const updateProfile = createAction(
    userTypes.UPDATE_PROFILE,
    props<acessoUsuariosModel & municipioModel>()
);


export const updateProfileError = createAction(
    userTypes.UPDATE_PROFILE_ERROR,
    props<ApiResponseErrors>(),
);