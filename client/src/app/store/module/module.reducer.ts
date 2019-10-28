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
    on(moduleActions.postModuleSuccess, (state, res) => ({
        ...state, modules: [...state.modules, res]
    })),
    on(moduleActions.postModuleEditSuccess, (state, res) => {
        const modules = [...state.modules];
        const index = modules.findIndex(m => m.id == res.id);
        modules[index] = res;
        return ({
            ...state, modules
        });
    }),
    on(moduleActions.deleteModuleSuccess, (state, res) => {
        const modules = [...state.modules];
        const index = modules.findIndex(m => m.id == res.id);
        modules.splice(index, 1);
        return ({
            ...state, modules
        });
    }),
);

export const getModuleState = createFeatureSelector<ModuleState>('moduleState');