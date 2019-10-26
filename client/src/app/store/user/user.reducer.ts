import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';

export const initialState: UserState = {
    user: {},
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, { email, nome }) => ({ ...state, user: { email, nome } })),
    on(UserActions.getProfileSuccess, (state, user) => ({ ...state, user })),
    on(UserActions.logout, () => (initialState)),
);

export const getUserState = createFeatureSelector<UserState>('userState');