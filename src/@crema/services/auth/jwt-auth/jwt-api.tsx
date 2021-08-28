import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BaseAPI = process.env.REACT_APP_API_URL;
const jwtAxios = axios.create({
  baseURL: BaseAPI,
  headers: {
    'Content-Type': 'application/json',
    'x-requestid': uuidv4(),
  },
});
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
    let errorMessage = `[Error] Unknown error, status code: ${error.response?.status ?? 0}`;
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
    jwtAxios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
