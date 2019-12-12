import { props, createAction } from '@ngrx/store';
import * as userTypes from "./user.types";
import {
    ApiResponseErrors, ChangePasswordBody,
    SendEmailChangePasswordBody, UserResponse, UserBody,
} from '@shared/interfaces';
import { LoginBody } from '@app/api/interfaces';

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
    props<UserResponse>()
);

export const getProfileError = createAction(
    userTypes.GET_PROFILE_ERROR,
    props<ApiResponseErrors>(),
);

export const updateProfile = createAction(
    userTypes.UPDATE_PROFILE,
    props<UserResponse>()
);

export const updateProfileError = createAction(
    userTypes.UPDATE_PROFILE_ERROR,
    props<ApiResponseErrors>(),
);

export const getUsers = createAction(
    userTypes.GET_USERS
);

export const getUsersSuccess = createAction(
    userTypes.GET_USERS_SUCCESS,
    props<UserResponse[]>()
);

export const postUser = createAction(
    userTypes.POST_USER,
    props<UserBody>(),
);

export const postUserSuccess = createAction(
    userTypes.POST_USER_SUCCESS,
    props<UserResponse>()
);

export const postUserEditSuccess = createAction(
    userTypes.POST_EDIT_USER_SUCCESS,
    props<UserResponse>()
);

export const deleteUser = createAction(
    userTypes.DELETE_USER,
    props<{ id: number }>(),
);

export const deleteUserSuccess = createAction(
    userTypes.DELETE_USER_SUCCESS,
    props<{ id: number }>(),
);

export const userApiError = createAction(
    userTypes.USER_API_ERROR,
    props<ApiResponseErrors>()
);