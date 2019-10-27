import { props, createAction } from '@ngrx/store';
import * as authTypes from "./access-permission.types";
import {
    ApiResponseErrors, MenuPermissionsResponse, PermissionResponse,
} from '@shared/interfaces';

export const getMenuPermissions = createAction(
    authTypes.GET_MENU_PERMISSIONS,
);

export const getMenuPermissionsSuccess = createAction(
    authTypes.GET_MENU_PERMISSIONS_SUCCESS,
    props<MenuPermissionsResponse[]>()
);

export const getMenuPermissionsError = createAction(
    authTypes.GET_MENU_PERMISSIONS_ERROR,
    props<ApiResponseErrors>()
);

export const getPermissions = createAction(
    authTypes.GET_PERMISSIONS,
);

export const getPermissionsSuccess = createAction(
    authTypes.GET_PERMISSIONS_SUCCESS,
    props<PermissionResponse[]>()
);

export const getPermissionsError = createAction(
    authTypes.GET_PERMISSIONS_ERROR,
    props<ApiResponseErrors>()
);