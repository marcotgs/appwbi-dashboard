import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as accessPermissionActions from './access-permission.actions';
import { AccessPermissionState } from '@app/store/states';

export const initialState: AccessPermissionState = {
    menuPermissions: null,
    permissions: null
};

export const accessPermissionReducer = createReducer(
    initialState,
    on(accessPermissionActions.getMenuPermissionsSuccess, (state, res) => ({
        ...state, menuPermissions: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(accessPermissionActions.getPermissionsSuccess, (state, res) => ({
        ...state, permissions: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
);

export const getAccessPermissionState = createFeatureSelector<AccessPermissionState>('accessPermissionState');