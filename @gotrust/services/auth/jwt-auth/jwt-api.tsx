import axios from 'axios';

const jwtAxios = axios.create({
  baseURL: 'http://localhost:8000/', //YOUR_API_URL HERE
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json'
  },
});
jwtAxios.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
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
