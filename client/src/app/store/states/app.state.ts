import { UserState, AuthState } from '@app/store/states';

export interface AppState {
    userState?: UserState;
    authState?: AuthState;
}