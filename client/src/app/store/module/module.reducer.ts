import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as moduleActions from './module.actions';
import { ModuleState } from '@app/store/states';

export const initialState: ModuleState = {
    modules: null,
};

export const moduleReducer = createReducer(
    initialState,
    on(moduleActions.getModulesSuccess, (state, res) => ({
        ...state, modules: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
);

export const getModuleState = createFeatureSelector<ModuleState>('moduleState');