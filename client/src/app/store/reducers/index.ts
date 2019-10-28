import {
  ActionReducerMap,
} from '@ngrx/store';
import { AppState } from '@app/store/states';
import { userReducer } from '@app/store/user';
import { accessPermissionReducer } from '@app/store/access-permission';
import { moduleReducer } from '@app/store/module';
import { routineReducer } from '@app/store/routine';


export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  accessPermissionState: accessPermissionReducer,
  moduleState: moduleReducer,
  routineState: routineReducer,
};