import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as routineActions from './routine.actions';
import { RoutineState } from '@app/store/states';

export const initialState: RoutineState = {
    routines: null,
};

export const routineReducer = createReducer(
    initialState,
    on(routineActions.getRoutinesSuccess, (state, res) => ({
        ...state, routines: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(routineActions.postRoutineSuccess, (state, res) => ({
        ...state, routines: [...state.routines, res]
    })),
    on(routineActions.postRoutineEditSuccess, (state, res) => {
        const routines = [...state.routines];
        const index = routines.findIndex(m => m.id == res.id);
        routines[index] = res;
        return ({
            ...state, routines
        });
    }),
    on(routineActions.deleteRoutineSuccess, (state, res) => {
        const routines = [...state.routines];
        const index = routines.findIndex(m => m.id == res.id);
        routines.splice(index, 1);
        return ({
            ...state, routines
        });
    }),
);

export const getRoutineState = createFeatureSelector<RoutineState>('routineState');