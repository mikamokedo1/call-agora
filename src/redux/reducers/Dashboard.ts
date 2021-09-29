import { AnyAction } from 'redux';
import {
  FETCH_STATISTIC,
  FETCH_ORDERS,
  FETCH_SUMMARY,
  FETCH_STATISTIC_CHART,
  FETCH_SELLERS,
  CREATE_SELLER,
  RESET_CREATE_SELLER_STATUS,
} from '../../types/actions/Dashboard';
import { AppState } from '../store/index';
import { Statistic, Order, Summary, Seller } from '../../types/models/Dashboard';
import { SIGNOUT_AUTH_SUCCESS } from '../../types/actions/Auth.actions';

type ActionType = 'statistic' | 'orders' | 'summary' | 'statisticChart' | 'sellers' | 'createSeller';

interface INIT_DASHBOARD {
  statistic: Statistic[];
  statisticChart: Statistic[];
  orders: Order[];
  summary?: Summary;
  sellers: Seller[];
  createUserStatus: boolean;
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
  statisticChart: [],
  summary: undefined,
  sellers: [],
  createUserStatus: false,
  errors: {
    statistic: null,
    orders: null,
    summary: null,
    statisticChart: null,
    sellers: null,
    createSeller: null,
  },
  loadings: {
    statistic: false,
    orders: false,
    summary: false,
    statisticChart: false,
    sellers: false,
    createSeller: false,
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
      return {
        ...state,
        statistic: action.payload,
        statisticChart: state.statisticChart.length === 0 ? action.payload : state.statisticChart,
        loadings: { ...state.loadings, statistic: false },
      };
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
      return {
        ...state,
        orders: action.payload,
        loadings: { ...state.loadings, orders: false },
      };
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
      return {
        ...state,
        summary: action.payload,
        loadings: { ...state.loadings, summary: false },
      };
    case FETCH_SUMMARY.error:
      return {
        ...state,
        errors: { ...state.errors, summary: action.message },
        loadings: { ...state.loadings, summary: false },
      };

    case FETCH_STATISTIC_CHART.pending:
      return {
        ...state,
        errors: { ...state.errors, statisticChart: null },
        loadings: { ...state.loadings, statisticChart: true },
      };
    case FETCH_STATISTIC_CHART.success:
      return {
        ...state,
        statisticChart: action.payload,
        loadings: { ...state.loadings, statisticChart: false },
        createUserStatus: true,
      };
    case FETCH_STATISTIC_CHART.error:
      return {
        ...state,
        errors: { ...state.errors, statisticChart: action.message },
        loadings: { ...state.loadings, statisticChart: false },
      };
    case 'RESET_FORGET_PASSWORD_SUCCESS_STATUS':
      return INIT_STATE;
    case SIGNOUT_AUTH_SUCCESS:
      return INIT_STATE;
    case FETCH_SELLERS.pending:
      return {
        ...state,
        errors: { ...state.errors, sellers: null },
        loadings: { ...state.loadings, sellers: true },
      };
    case FETCH_SELLERS.success:
      return {
        ...state,
        sellers: action.payload,
        loadings: { ...state.loadings, sellers: false },
      };
    case FETCH_SELLERS.error:
      return {
        ...state,
        errors: { ...state.errors, sellers: action.message },
        loadings: { ...state.loadings, sellers: false },
      };
    case CREATE_SELLER.pending:
      return {
        ...state,
        errors: { ...state.errors, createSeller: null },
        loadings: { ...state.loadings, createSeller: true },
      };
    case CREATE_SELLER.success:
      return {
        ...state,
        createUserStatus: true,
        loadings: { ...state.loadings, createSeller: false },
      };
    case CREATE_SELLER.error:
      return {
        ...state,
        errors: { ...state.errors, createSeller: action.message },
        loadings: { ...state.loadings, createSeller: false },
      };
    case RESET_CREATE_SELLER_STATUS.pending: {
      return {
        ...state,
        createUserStatus: false,
        errors: { ...state.errors, createSeller: null },
      };
    }
    default:
      return state;
  }
};

export default DashboardReducer;

export const statisticSelector = (state: AppState) => state.dashboard.statistic;
export const ordersSelector = (state: AppState) => state.dashboard.orders;
export const summarySelector = (state: AppState) => state.dashboard.summary;
export const statisticChartSelector = (state: AppState) => state.dashboard.statisticChart;
