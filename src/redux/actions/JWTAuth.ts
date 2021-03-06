import { Dispatch } from 'redux';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import CryptoJS from 'crypto-js';
import { supabase } from 'src/shared/supabaseClient';
import jwt_decode from 'jwt-decode';
import { JWTdecode } from 'src/redux/reducers/Auth';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { AppActions } from '../../types';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  CHANGE_PASSWORD,
  ChangePasswordParams,
  ChangeBankParams,
  CHANGE_BANK_INFO,
  CHANGE_AVATAR,
  FORGET_PASSWORD,
} from '../../types/actions/Auth.actions';

const keyHmac = process.env.REACT_APP_KEY_HASHMAC;
export const onJwtUserSignUp = (body: { email: string; password: string; name: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('/users/login', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
    } catch (err) {
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const onJwtSignIn = (body: { username: string; password: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    const uid = uuidv4();
    const passwordMd5 = md5(body.password);
    const string = `${uid}GOTRUST${body.username}${passwordMd5}`;
    const has = CryptoJS.HmacSHA256(string, keyHmac ?? '').toString();
    try {
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.post('/users/login', {
        ...body,
        signature: has,
      });

      if (res.data) {
        localStorage.setItem('token', res.data.accessToken);
        dispatch(setJWTToken(res.data.accessToken));
      } else {
        dispatch(fetchError(get(res, 'result.message')));
      }
      // await loadJWTUser(dispatch);
    } catch (err) {
      dispatch(fetchError(err));
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

export const setJWTToken = (token: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: SET_AUTH_TOKEN,
      payload: {
        token,
      },
    });
    const decoded: JWTdecode = jwt_decode(token);
    const { user, error } = await supabase.auth.signIn({
      email: decoded.email,
      password: decoded.email,
    });
    if (error) {
      const { user } = await supabase.auth.signUp({
        email: decoded.email,
        password: decoded.email,
      });
      dispatch({
        type: 'USER_ID_SUPBASE',
        payload: user?.id,
      });
    } else {
      dispatch({
        type: 'USER_ID_SUPBASE',
        payload: user?.id,
      });
    }
  };
};

// const getUserObject = (authUser: any): AuthUser => {
//   return {
//     authType: AuthType.JWT_AUTH,
//     displayName: authUser.name,
//     email: authUser.email,
//     role: defaultUser.role,
//     token: authUser._id,
//     uid: authUser._id,
//     photoURL: authUser.avatar,
//   };
// };

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

export const changePassword = (payload: ChangePasswordParams) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: CHANGE_PASSWORD.pending });
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/change-password', payload);
      if (res.result.code === 'success') {
        dispatch({ type: CHANGE_PASSWORD.success });
        dispatch({ type: SIGNOUT_AUTH_SUCCESS });
        localStorage.removeItem('token');
      } else {
        dispatch({
          type: CHANGE_PASSWORD.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({ type: CHANGE_PASSWORD.error, message: error });
    }
  };
};

export const changeBankInfo = (payload: ChangeBankParams) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: CHANGE_BANK_INFO.pending });
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/update-bankinfor', payload);
      if (res.result.code === 'success') {
        dispatch({ type: CHANGE_BANK_INFO.success, payload });
      } else {
        dispatch({
          type: CHANGE_BANK_INFO.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({ type: CHANGE_BANK_INFO.error, message: error });
    }
  };
};
export const changeAvatar = (payload: { username: string; url: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: CHANGE_AVATAR.pending });
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/avatar-url', payload);
      if (res.result.code === 'success') {
        dispatch({ type: CHANGE_AVATAR.success, payload: payload.url });
      } else {
        dispatch({
          type: CHANGE_AVATAR.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({ type: CHANGE_AVATAR.error, message: error });
    }
  };
};

export const forgetPassword = (payload: { username: string; email: string }) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FORGET_PASSWORD.pending });
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/forgot-password', payload);
      if (res.result.code === 'success') {
        dispatch({ type: FORGET_PASSWORD.success });
      } else {
        dispatch({
          type: FORGET_PASSWORD.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({ type: FORGET_PASSWORD.error, message: error });
    }
  };
};
