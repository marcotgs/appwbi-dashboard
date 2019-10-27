import { props, createAction } from '@ngrx/store';
import * as moduleTypes from "./module.types";
import {
    ApiResponseErrors, MenuPermissionsResponse,
} from '@shared/interfaces';

export const getModules = createAction(
    moduleTypes.GET_MODULES
);

export const getModulesSuccess = createAction(
    moduleTypes.GET_MODULES_SUCCESS,
    props<MenuPermissionsResponse[]>()
);

export const getModulesError = createAction(
    moduleTypes.GET_MODULES_ERROR,
    props<ApiResponseErrors>()
);