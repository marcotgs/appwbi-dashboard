import { UserState, AuthState, ModuleState } from '@app/store/states';

export interface AppState {
    userState?: UserState;
    authState?: AuthState;
    moduleState?: ModuleState;
}