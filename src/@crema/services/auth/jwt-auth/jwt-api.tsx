import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import configureStore, { history } from '../../../../redux/store/index';

const BaseAPI = process.env.REACT_APP_API_URL;
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const refreshAuthLogic = (failedRequest: any) =>
  axios
    .post(`${BaseAPI}/users/refresh-token`, {}, axiosConfig)
    .then((tokenRefreshResponse) => {
      if (tokenRefreshResponse.data.result.code === 'error') {
        delete axios.defaults.headers.common.Authorization;
        localStorage.removeItem('token');
        history.push('/signin');
        configureStore.dispatch({
          type: 'SET_AUTH_TOKEN',
          payload: {
            token: '',
          },
        });
        console.log(tokenRefreshResponse.data.result.code);
      } else {
        localStorage.setItem('token', tokenRefreshResponse.data.accessToken);
        failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;
      }
      return Promise.resolve();
    })
    .catch((error) => {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
      console.log(error);
    });
const jwtAxios = axios.create({
  baseURL: BaseAPI,
  headers: {
    'Content-Type': 'application/json',
  },
});
createAuthRefreshInterceptor(jwtAxios, refreshAuthLogic);
// jwtAxios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response && err.response.data.msg === 'Token is not valid') {
//       console.log('Need to logout user');
//       // store.dispatch({type: LOGOUT});
//     }
//     return Promise.reject(err);
//   },
// );

jwtAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = `Server hiện tại đang bão trì. vui lòng thử lại sau!`;
    if (error.response?.status >= 400) {
      try {
        const errJson = error.response.data;
        console.log(errJson);
        if (errJson && errJson.error) {
          errorMessage = errJson.error;
        }
      } catch (err) {
        console.log('Failed to decode error json response');
      }
    }
    console.log(errorMessage);
    return Promise.reject(errorMessage);
  },
);
export const setAuthToken = (token: string | null) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
