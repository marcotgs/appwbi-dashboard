import {
  ActionReducerMap,
} from '@ngrx/store';
import { AppState } from '@app/store/states';
import { userReducer } from '@app/store/user';
import { accessPermissionReducer } from '@app/store/access-permission';
import { moduleReducer } from '@app/store/module';
import { routineReducer } from '@app/store/routine';
import { processReducer } from '@app/store/process';
import { sectorReducer } from '@app/store/sector';
import { companyReducer } from '@app/store/company';
import { companyBranchReducer } from '@app/store/company-branch';


export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  accessPermissionState: accessPermissionReducer,
  moduleState: moduleReducer,
  routineState: routineReducer,
  processState: processReducer,
  sectorState: sectorReducer,
  companyState: companyReducer,
  companyBranchState: companyBranchReducer
};