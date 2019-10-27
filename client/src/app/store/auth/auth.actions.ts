import { props, createAction } from '@ngrx/store';
import * as authTypes from "./auth.types";
import {
    ApiResponseErrors, MenuPermissionsResponse,
} from '@shared/interfaces';

export const getPermissions = createAction(
    authTypes.GET_PERMISSIONS
);

export const getPermissionsSuccess = createAction(
    authTypes.GET_PERMISSIONS_SUCCESS,
    props<MenuPermissionsResponse[]>()
);

export const getPermissionsError = createAction(
    authTypes.GET_PERMISSIONS_ERROR,
    props<ApiResponseErrors>()
);