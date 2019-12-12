import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as processActions from './process.actions';
import { ProcessState } from '@app/store/states';

export const initialState: ProcessState = {
    processes: null,
};

export const processReducer = createReducer(
    initialState,
    on(processActions.getProcessSuccess, (state, res) => ({
        ...state, processes: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(processActions.postProcessSuccess, (state, res) => ({
        ...state, processes: [...state.processes, res]
    })),
    on(processActions.postProcessEditSuccess, (state, res) => {
        const processes = [...state.processes];
        const index = processes.findIndex(m => m.id == res.id);
        processes[index] = res;
        return ({
            ...state, processes
        });
    }),
    on(processActions.deleteProcessSuccess, (state, res) => {
        const processes = [...state.processes];
        const index = processes.findIndex(m => m.id == res.id);
        processes.splice(index, 1);
        return ({
            ...state, processes
        });
    }),
);

export const getProcessState = createFeatureSelector<ProcessState>('processState');