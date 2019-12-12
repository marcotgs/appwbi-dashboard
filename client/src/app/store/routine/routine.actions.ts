import { props, createAction } from '@ngrx/store';
import * as routineTypes from "./routine.types";
import {
    ApiResponseErrors, RoutineBody, RoutineResponse,
} from '@shared/interfaces';

export const getRoutines = createAction(
    routineTypes.GET_ROUTINE
);

export const getRoutinesSuccess = createAction(
    routineTypes.GET_ROUTINE_SUCCESS,
    props<RoutineResponse[]>()
);

export const getRoutinesError = createAction(
    routineTypes.GET_ROUTINE_ERROR,
    props<ApiResponseErrors>()
);

export const postRoutine = createAction(
    routineTypes.POST_ROUTINE,
    props<RoutineBody>(),
);

export const postRoutineSuccess = createAction(
    routineTypes.POST_ROUTINE_SUCCESS,
    props<RoutineResponse>()
);

export const postRoutineEditSuccess = createAction(
    routineTypes.POST_EDIT_ROUTINE_SUCCESS,
    props<RoutineResponse>()
);

export const postRoutineError = createAction(
    routineTypes.POST_ROUTINE_ERROR,
    props<ApiResponseErrors>()
);

export const deleteRoutine = createAction(
    routineTypes.DELETE_ROUTINE,
    props<{ id: number }>(),
);

export const deleteRoutineSuccess = createAction(
    routineTypes.DELETE_ROUTINE_SUCCESS,
    props<{ id: number }>(),
);

export const deleteRoutineError = createAction(
    routineTypes.DELETE_ROUTINE_ERROR,
    props<ApiResponseErrors>()
);