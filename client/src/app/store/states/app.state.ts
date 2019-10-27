import { UserState, AccessPermissionState, ModuleState } from '@app/store/states';

export interface AppState {
    userState?: UserState;
    accessPermissionState?: AccessPermissionState;
    moduleState?: ModuleState;
}