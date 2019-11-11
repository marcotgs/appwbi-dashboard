import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as accessPermissionActions from './access-permission.actions';
import { AccessPermissionState } from '@app/store/states';

export const initialState: AccessPermissionState = {
    menuPermissions: null,
    permissions: null
};

export const accessPermissionReducer = createReducer(
    initialState,
    on(accessPermissionActions.clearMenuPermissions, () => (initialState)),
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
    on(accessPermissionActions.postPermissionSuccess, (state, res) => ({
        ...state, permissions: [...state.permissions, res]
    })),
    on(accessPermissionActions.postPermissionEditSuccess, (state, res) => {
        const permissions = [...state.permissions];
        const index = permissions.findIndex(m => m.id == res.id);
        permissions[index] = res;
        return ({
            ...state, permissions
        });
    }),
    on(accessPermissionActions.deletePermissionSuccess, (state, res) => {
        const permissions = [...state.permissions];
        const index = permissions.findIndex(m => m.id == res.id);
        permissions.splice(index, 1);
        return ({
            ...state, permissions
        });
    }),
);

export const getAccessPermissionState = createFeatureSelector<AccessPermissionState>('accessPermissionState');