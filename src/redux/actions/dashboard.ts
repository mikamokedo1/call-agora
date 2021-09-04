import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import { FETCH_STATISTIC, FETCH_ORDERS } from '../../types/actions/Dashboard';
import { AppActions } from '../../types';

export const fetchStatistic = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_STATISTIC.pending });
      const res = await jwtAxios.get('/statistics');
      console.log(res);
    } catch (error) {
      dispatch({ type: FETCH_STATISTIC.error, message: error.message });
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_ORDERS.pending });
      const res = await jwtAxios.get('​/orders');
      console.log(res);
    } catch (error) {
      dispatch({ type: FETCH_ORDERS.error, message: error.message });
    }
  };
};
