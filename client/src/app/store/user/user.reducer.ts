import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';

export const initialState: UserState = {
    email: null,
    nome: null,
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, { email, nome }) => ({ ...state, email, nome })),
    on(UserActions.logout, () => (initialState)),
);

export const getUserState = createFeatureSelector<UserState>('userState');