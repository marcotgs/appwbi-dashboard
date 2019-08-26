import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';

export const initialState: UserState = {
    token: null,
    email: null
};

export function userReducer(state = initialState, action: UserActions.All): UserState {
    switch (action.type) {
        case UserActions.LOGIN_SUCCESS: {
            console.log(action.payload);
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export const getUserState = createFeatureSelector<UserState>('userState');

export const getToken = createSelector(
    getUserState,
    (state: UserState) => state.token
); 