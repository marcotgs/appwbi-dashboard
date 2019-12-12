import {
    UserState, AccessPermissionState, ModuleState,
    RoutineState, ProcessState, SectorState, CompanyState,
    CompanyBranchState
} from '@app/store/states';

export interface AppState {
    userState?: UserState;
    accessPermissionState?: AccessPermissionState;
    moduleState?: ModuleState;
    routineState?: RoutineState;
    processState?: ProcessState;
    sectorState?: SectorState;
    companyState?: CompanyState;
    companyBranchState?: CompanyBranchState;
}