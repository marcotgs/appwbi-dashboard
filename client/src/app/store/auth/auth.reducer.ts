import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { AuthState } from '@app/store/states';

export const initialState: AuthState = {
    permissions: null,
};

export const authReducer = createReducer(
    initialState,
    on(authActions.getPermissionsSuccess, (state, res) => ({
        ...state, permissions: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
);

export const getAuthState = createFeatureSelector<AuthState>('authState');