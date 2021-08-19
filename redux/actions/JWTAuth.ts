import jwtAxios from '../../@gotrust/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
// import {defaultUser} from '../../shared/constants/AppConst';
// import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';
import {Cookies} from 'react-cookie';

export const onJwtUserSignUp = (body: {
  email: string;
  password: string;
  name: string;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('users', body);
      const cookies = new Cookies();
      cookies.set("token", res.data.token, { path: "/" });
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
    } catch (err) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const onJwtSignIn = (body: {email: string; password: string}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('/auth/login', body);
      const cookies = new Cookies();
      cookies.set("token", res.data.access_token, { path: "/" });
      dispatch(setJWTToken(res.data.access_token));
      await loadJWTUser(dispatch);
    } catch (err) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  try {
    // console.log('res.data loading');
    // const res = await jwtAxios.get('/auth');
    dispatch(fetchSuccess());
    // console.log('res.data', res.data);
    dispatch({
      type: UPDATE_AUTH_USER,
      // payload: getUserObject(res.data),
      payload: {
        authType: AuthType.JWT_AUTH,
        displayName: "Hai lua",
        email: "haha@gamil.com",
        role: ["1"],
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTYyNzU3MDk5NSwiZXhwIjoxNjI3NTc0NTk1fQ.nqjamPx6kdJARED9keNDir20pGb-uMOL_bejxWDtWQg",
        uid: "1",
        photoURL: "",
      }
    });
  } catch (err) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export const setJWTToken = (token: string | null): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

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
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      const cookies = new Cookies();
      cookies.remove("token");
    }, 500);
  };
};
