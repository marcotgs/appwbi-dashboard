import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';

export const initialState: UserState = {
    currentUser: {},
    users: null,
    apiErrors: null,
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, { email, nome, idEmpresa }) => ({ ...state, currentUser: { email, nome, idEmpresa } })),
    on(UserActions.getProfileSuccess, (state, user) => ({ ...state, currentUser: user })),
    on(UserActions.logout, () => (initialState)),
    on(UserActions.getUsersSuccess, (state, res) => ({
        ...state, users: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
    on(UserActions.postUserSuccess, (state, res) => ({
        ...state,
        users: [...state.users, res],
        apiErrors: null,
    })),
    on(UserActions.postUserEditSuccess, (state, res) => {
        const users = [...state.users];
        const index = users.findIndex(m => m.id == res.id);
        users[index] = res;
        return ({
            ...state,
            users,
            apiErrors: null,
        });
    }),
    on(UserActions.deleteUserSuccess, (state, res) => {
        const users = [...state.users];
        const index = users.findIndex(m => m.id == res.id);
        users.splice(index, 1);
        return ({
            ...state, 
            users,
            apiErrors: null,
        });
    }),
    on(UserActions.userApiError, (state, res) => {
        return ({
            ...state, apiErrors: res,
        });
    }),
);

export const getUserState = createFeatureSelector<UserState>('userState');