import { AnyAction } from 'redux';
import { FETCH_STATISTIC, FETCH_ORDERS, FETCH_SUMMARY } from '../../types/actions/Dashboard';
import { AppState } from '../store/index';
import { Statistic, Order, Sumary } from '../../types/models/Dashboard';

type ActionType = 'statistic' | 'orders' | 'summary';

interface INIT_DASHBOARD {
  statistic: Statistic[];
  orders: Order[];
  summary?: Sumary;
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
  summary: undefined,
  errors: {
    statistic: null,
    orders: null,
    summary: null,
  },
  loadings: {
    statistic: false,
    orders: false,
    summary: false,
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
    case FETCH_SUMMARY.pending:
      return {
        ...state,
        errors: { ...state.errors, summary: null },
        loadings: { ...state.loadings, summary: true },
      };
    case FETCH_SUMMARY.success:
      return { ...state, summary: action.payload, loadings: { ...state.loadings, summary: false } };
    case FETCH_SUMMARY.error:
      return {
        ...state,
        errors: { ...state.errors, summary: action.message },
        loadings: { ...state.loadings, summary: false },
      };
    default:
      return state;
  }
};

export default DashboardReducer;

export const statisticSelector = (state: AppState) => state.dashboard.statistic;
export const ordersSelector = (state: AppState) => state.dashboard.orders;
export const summarySelector = (state: AppState) => state.dashboard.summary;
