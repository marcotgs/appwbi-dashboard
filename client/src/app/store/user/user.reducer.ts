import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '@app/store/states';
import { LoginResponse, ApiResponseErrors } from '@app/api/interfaces';

export const initialState: UserState = {
    token: null,
};

export function userReducer(state = initialState, action: UserActions.All): UserState {
    switch (action.type) {
        case UserActions.LOGIN_SUCCESS: {
            return { ...state, token: (action.payload as LoginResponse).token, };
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