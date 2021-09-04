import { AnyAction } from 'redux';
import { AuthType } from '../../shared/constants/AppEnums';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  CHANGE_PASSWORD,
} from '../../types/actions/Auth.actions';
import { AuthUser } from '../../types/models/AuthUser';
import { AppState } from '../store';

type ActionType = 'login' | 'changePassword';

interface INIT_AUTH {
  user: AuthUser | null;
  token: string | null;
  errors: {
    [k in ActionType]: null | string;
  };
  loadings: {
    [k in ActionType]: boolean;
  };
}

const INIT_STATE: INIT_AUTH = {
  user: null,
  token: null,
  errors: {
    login: null,
    changePassword: null,
  },
  loadings: {
    login: false,
    changePassword: false,
  },
};

const Auth = (state: INIT_AUTH = INIT_STATE, action: AnyAction): INIT_AUTH => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SIGNOUT_AUTH_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        token: action.payload.token,
        user: {
          uid: '1',
          role: ['user', 'admin'],
          authType: AuthType.JWT_AUTH,
          displayName: 'admin',
          email: 'crema.demo@gmail.com',
          token: '5f4baae13ccef700178e1da4',
        },
      };
    }
    case CHANGE_PASSWORD.pending:
      return {
        ...state,
        errors: { ...state.errors, changePassword: null },
        loadings: { ...state.loadings, changePassword: true },
      };
    case CHANGE_PASSWORD.success:
      return { ...state, loadings: { ...state.loadings, changePassword: false } };
    case CHANGE_PASSWORD.error:
      return {
        ...state,
        errors: { ...state.errors, changePassword: action.message },
        loadings: { ...state.loadings, changePassword: false },
      };
    default:
      return state;
  }
};
export default Auth;

export const userSelector = (state: AppState) => state.auth.user;
