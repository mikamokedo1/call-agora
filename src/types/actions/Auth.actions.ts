import { AuthUser } from '../models/AuthUser';
import { reduxRequestActionGenerator } from '../../@crema/utility/Utils';

export const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SIGNOUT_AUTH_SUCCESS = 'SIGNOUT_AUTH_SUCCESS';

export interface SetAuthTokenActions {
  type: typeof SET_AUTH_TOKEN;
  payload: {
    token: string;
  };
}

export interface UpdateAuthUserActions {
  type: typeof UPDATE_AUTH_USER;
  payload: AuthUser | null;
}

export interface SignoutAuthUserActions {
  type: typeof SIGNOUT_AUTH_SUCCESS;
}

const scope = 'auth';

export const CHANGE_PASSWORD = reduxRequestActionGenerator(scope, 'CHANGE_PASSWORD');

export interface ChangePasswordParams {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ChangePasswordAction {
  type: typeof CHANGE_PASSWORD.pending;
  payload: ChangePasswordParams;
}

export interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD.success;
}
export interface ChangePasswordFailedAction {
  type: typeof CHANGE_PASSWORD.error;
  message: string;
}

export type AuthActions =
  | UpdateAuthUserActions
  | SetAuthTokenActions
  | SignoutAuthUserActions
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailedAction;
