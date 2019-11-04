import { props, createAction } from '@ngrx/store';
import * as authTypes from "./access-permission.types";
import {
    ApiResponseErrors, MenuPermissionsResponse,
    PermissionResponse, PermissionBody
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

export const postPermission = createAction(
    authTypes.POST_PERMISSIONS,
    props<PermissionBody & { update: boolean }>(),
);

export const postPermissionSuccess = createAction(
    authTypes.POST_PERMISSIONS_SUCCESS,
    props<PermissionResponse>()
);

export const postPermissionEditSuccess = createAction(
    authTypes.POST_EDIT_PERMISSIONS_SUCCESS,
    props<PermissionResponse>()
);

export const postPermissionError = createAction(
    authTypes.POST_PERMISSIONS_ERROR,
    props<ApiResponseErrors>()
);

export const deletePermission = createAction(
    authTypes.DELETE_PERMISSIONS,
    props<{ id: number }>(),
);

export const deletePermissionSuccess = createAction(
    authTypes.DELETE_PERMISSIONS_SUCCESS,
    props<{ id: number }>(),
);

export const deletePermissionError = createAction(
    authTypes.DELETE_PERMISSIONS_ERROR,
    props<ApiResponseErrors>()
);