import { UserState, AccessPermissionState, ModuleState, RoutineState } from '@app/store/states';

export interface AppState {
    userState?: UserState;
    accessPermissionState?: AccessPermissionState;
    moduleState?: ModuleState;
    routineState?: RoutineState;
}