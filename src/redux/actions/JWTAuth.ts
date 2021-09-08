import {Dispatch} from 'redux';
import {get} from 'lodash';
import {v4 as uuidv4} from 'uuid';
import md5 from 'md5';
import CryptoJS from 'crypto-js';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
  CHANGE_PASSWORD,
  ChangePasswordParams,
  ChangeBankParams,
  CHANGE_BANK_INFO,
  CHANGE_AVATAR,
} from '../../types/actions/Auth.actions';

const keyHmac = process.env.REACT_APP_KEY_HASHMAC;
export const onJwtUserSignUp = (body: {
  email: string;
  password: string;
  name: string;
}) => {
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

export const onJwtSignIn = (body: {username: string; password: string}) => {
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
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      localStorage.removeItem('token');
    }, 500);
  };
};

export const changePassword = (payload: ChangePasswordParams) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({type: CHANGE_PASSWORD.pending});
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/change-password', payload);
      if (res.result.code === 'success') {
        dispatch({type: CHANGE_PASSWORD.success});
        dispatch({type: SIGNOUT_AUTH_SUCCESS});
        localStorage.removeItem('token');
      } else {
        dispatch({
          type: CHANGE_PASSWORD.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({type: CHANGE_PASSWORD.error, message: error});
    }
  };
};

export const changeBankInfo = (payload: ChangeBankParams) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({type: CHANGE_BANK_INFO.pending});
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/update-bankinfor', payload);
      if (res.result.code === 'success') {
        dispatch({type: CHANGE_BANK_INFO.success, payload});
      } else {
        dispatch({
          type: CHANGE_BANK_INFO.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({type: CHANGE_BANK_INFO.error, message: error});
    }
  };
};
export const changeAvatar = (payload: {username: string; url: string}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({type: CHANGE_AVATAR.pending});
      const uid = uuidv4();
      jwtAxios.defaults.headers.common['x-requestid'] = uid;
      const res = await jwtAxios.put('/users/avatar-url', payload);
      if (res.result.code === 'success') {
        dispatch({type: CHANGE_AVATAR.success, payload: payload.url});
      } else {
        dispatch({
          type: CHANGE_AVATAR.error,
          message: get(res, 'result.message'),
        });
      }
    } catch (error) {
      dispatch({type: CHANGE_AVATAR.error, message: error});
    }
  };
};
