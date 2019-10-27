import {
  ActionReducerMap,
} from '@ngrx/store';
import { AppState } from '@app/store/states';
import { userReducer } from '@app/store/user';
import { authReducer } from '@app/store/auth';


export const reducers: ActionReducerMap<AppState> = {
  userState: userReducer,
  authState: authReducer,
};