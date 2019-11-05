import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';

export const initialState: UserState = {
    currentUser: {},
    users: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, { email, nome }) => ({ ...state, currentUser: { email, nome } })),
    on(UserActions.getProfileSuccess, (state, user) => ({ ...state, currentUser: user })),
    on(UserActions.logout, () => (initialState)),
    on(UserActions.getUsersSuccess, (state, res) => ({
        ...state, users: Object.keys(res).reduce((array, key) => {
            if (key !== 'type')
                array.push(res[key]);
            return array;
        }, [])
    })),
);

export const getUserState = createFeatureSelector<UserState>('userState');