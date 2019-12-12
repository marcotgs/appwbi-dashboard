import { props, createAction } from '@ngrx/store';
import * as processTypes from "./process.types";
import {
    ApiResponseErrors, ProcessBody, ProcessResponse,
} from '@shared/interfaces';

export const getProcess = createAction(
    processTypes.GET_PROCESS
);

export const getProcessSuccess = createAction(
    processTypes.GET_PROCESS_SUCCESS,
    props<ProcessResponse[]>()
);

export const getProcessError = createAction(
    processTypes.GET_PROCESS_ERROR,
    props<ApiResponseErrors>()
);

export const postProcess = createAction(
    processTypes.POST_PROCESS,
    props<ProcessBody>(),
);

export const postProcessSuccess = createAction(
    processTypes.POST_PROCESS_SUCCESS,
    props<ProcessResponse>()
);

export const postProcessEditSuccess = createAction(
    processTypes.POST_EDIT_PROCESS_SUCCESS,
    props<ProcessResponse>()
);

export const postProcessError = createAction(
    processTypes.POST_PROCESS_ERROR,
    props<ApiResponseErrors>()
);

export const deleteProcess = createAction(
    processTypes.DELETE_PROCESS,
    props<{ id: number }>(),
);

export const deleteProcessSuccess = createAction(
    processTypes.DELETE_PROCESS_SUCCESS,
    props<{ id: number }>(),
);

export const deleteProcessError = createAction(
    processTypes.DELETE_PROCESS_ERROR,
    props<ApiResponseErrors>()
);