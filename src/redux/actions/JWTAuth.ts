import { Dispatch } from 'redux';
import { get } from 'lodash';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { AuthType } from '../../shared/constants/AppEnums';
import { defaultUser } from '../../shared/constants/AppConst';
import { AuthUser } from '../../types/models/AuthUser';
import { AppActions } from '../../types';
import { SET_AUTH_TOKEN, SIGNOUT_AUTH_SUCCESS, UPDATE_AUTH_USER } from '../../types/actions/Auth.actions';

export const onJwtUserSignUp = (body: { email: string; password: string; name: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('/users/login', body);
      console.log(res);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
      // await loadJWTUser(dispatch);
    } catch (err) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const onJwtSignIn = (body: { username: string; password: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('/users/login', body);
      console.log(res.data);
      if (res.data) {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setJWTToken(res.data.accessToken));
      } else {
        dispatch(fetchError(get(res, 'result.message')));
        console.log(res.data);
      }

      // await loadJWTUser(dispatch);
    } catch (err) {
      // console.log('error!!!!', err.response.data.error);
      // dispatch(fetchError(err.response.data.error));
    }
  };
};

// export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
//   dispatch(fetchStart());
//   try {
//     const res = await jwtAxios.get('/auth');
//     dispatch(fetchSuccess());
//     console.log('res.data', res.data);
//     dispatch({
//       type: UPDATE_AUTH_USER,
//       payload: getUserObject(res.data),
//     });
//   } catch (err) {
//     console.log('error!!!!', err.response.error);
//     dispatch(fetchError(err.response.error));
//   }
// };

export const setJWTToken = (token: string): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: {
    token,
  },
});

const getUserObject = (authUser: any): AuthUser => {
  return {
    authType: AuthType.JWT_AUTH,
    displayName: authUser.name,
    email: authUser.email,
    role: defaultUser.role,
    token: authUser._id,
    uid: authUser._id,
    photoURL: authUser.avatar,
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({ type: SIGNOUT_AUTH_SUCCESS });
      dispatch(fetchSuccess());
      localStorage.removeItem('token');
    }, 500);
  };
};
