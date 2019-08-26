import {
  ActionReducerMap,
} from '@ngrx/store';
import { AppState } from '@app/store/states';
import { userReducer } from '@app/store/user';


export const reducers: ActionReducerMap<AppState> = {
  user: userReducer
};