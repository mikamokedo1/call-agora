import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {
  FETCH_STATISTIC,
  FETCH_ORDERS,
  FETCH_SUMMARY,
  FETCH_STATISTIC_CHART,
  FETCH_SELLERS,
  CREATE_SELLER,
  RESET_CREATE_SELLER_STATUS,
} from '../../types/actions/Dashboard';
import { AppActions } from '../../types';

export const fetchStatistic = (fromDate?: string, toDate?: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_STATISTIC.pending });
      const res = await jwtAxios.get(
        fromDate ? `/statistics/date-range?fromDate=${fromDate}&toDate=${toDate}` : '/statistics/date-range',
      );
      if (res) {
        dispatch({ type: FETCH_STATISTIC.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: FETCH_STATISTIC.error, message: error });
    }
  };
};
export const fetchStatisticChart = (fromDate?: string, toDate?: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_STATISTIC_CHART.pending });
      const res = await jwtAxios.get(
        fromDate ? `/statistics/date-range?fromDate=${fromDate}&toDate=${toDate}` : '/statistics/date-range',
      );
      if (res) {
        dispatch({ type: FETCH_STATISTIC_CHART.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: FETCH_STATISTIC_CHART.error, message: error });
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_ORDERS.pending });
      const res = await jwtAxios.get('/orders');
      if (res) {
        dispatch({ type: FETCH_ORDERS.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: FETCH_ORDERS.error, message: error });
    }
  };
};

export const fetchSummary = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_SUMMARY.pending });
      const res = await jwtAxios.get('/statistics/total-summary');
      if (res) {
        dispatch({ type: FETCH_SUMMARY.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: FETCH_SUMMARY.error, message: error });
    }
  };
};

export const fetchSellers = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: FETCH_SELLERS.pending });
      const res = await jwtAxios.get('/users/sellers');
      console.log(res);
      if (res) {
        dispatch({ type: FETCH_SELLERS.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: FETCH_SELLERS.error, message: error });
    }
  };
};

export const createSellers = (fullName: string, email: string, phone: string) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: CREATE_SELLER.pending });
      const res = await jwtAxios.post('/users/seller', {
        fullName,
        email,
        phone,
      });
      console.log(res);
      if (res) {
        dispatch({ type: CREATE_SELLER.success, payload: res });
      }
    } catch (error) {
      dispatch({ type: CREATE_SELLER.error, message: error });
    }
  };
};

export const resetCreateUserStatus = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({ type: RESET_CREATE_SELLER_STATUS.pending });
  };
};
