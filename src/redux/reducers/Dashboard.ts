import { AnyAction } from 'redux';
import { FETCH_STATISTIC, FETCH_ORDERS } from '../../types/actions/Dashboard';
import { AppState } from '../store/index';
import { Statistic, Order } from '../../types/models/Dashboard';

type ActionType = 'statistic' | 'orders';

interface INIT_DASHBOARD {
  statistic: Statistic[];
  orders: Order[];
  errors: {
    [k in ActionType]: null | string;
  };
  loadings: {
    [k in ActionType]: boolean;
  };
}

const INIT_STATE: INIT_DASHBOARD = {
  statistic: [],
  orders: [],
  errors: {
    statistic: null,
    orders: null,
  },
  loadings: {
    statistic: false,
    orders: false,
  },
};

const DashboardReducer = (state: INIT_DASHBOARD = INIT_STATE, action: AnyAction): INIT_DASHBOARD => {
  switch (action.type) {
    case FETCH_STATISTIC.pending:
      return {
        ...state,
        errors: { ...state.errors, statistic: null },
        loadings: { ...state.loadings, statistic: true },
      };
    case FETCH_STATISTIC.success:
      return { ...state, statistic: action.payload, loadings: { ...state.loadings, statistic: false } };
    case FETCH_STATISTIC.error:
      return {
        ...state,
        errors: { ...state.errors, statistic: action.message },
        loadings: { ...state.loadings, statistic: false },
      };
    case FETCH_ORDERS.pending:
      return {
        ...state,
        errors: { ...state.errors, orders: null },
        loadings: { ...state.loadings, orders: true },
      };
    case FETCH_ORDERS.success:
      return { ...state, orders: action.payload, loadings: { ...state.loadings, orders: false } };
    case FETCH_ORDERS.error:
      return {
        ...state,
        errors: { ...state.errors, orders: action.message },
        loadings: { ...state.loadings, orders: false },
      };
    default:
      return state;
  }
};

export default DashboardReducer;

export const statisticSelector = (state: AppState) => state.dashboard.statistic;
export const ordersSelector = (state: AppState) => state.dashboard.orders;
