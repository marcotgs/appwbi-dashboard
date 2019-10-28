import { props, createAction } from '@ngrx/store';
import * as moduleTypes from "./module.types";
import {
    ApiResponseErrors, ModuleBody, ModuleResponse,
} from '@shared/interfaces';

export const getModules = createAction(
    moduleTypes.GET_MODULES
);

export const getModulesSuccess = createAction(
    moduleTypes.GET_MODULES_SUCCESS,
    props<ModuleResponse[]>()
);

export const getModulesError = createAction(
    moduleTypes.GET_MODULES_ERROR,
    props<ApiResponseErrors>()
);

export const postModule = createAction(
    moduleTypes.POST_MODULE,
    props<ModuleBody>(),
);

export const postModuleSuccess = createAction(
    moduleTypes.POST_MODULE_SUCCESS,
    props<ModuleResponse>()
);

export const postModuleError = createAction(
    moduleTypes.POST_MODULE_ERROR,
    props<ApiResponseErrors>()
);