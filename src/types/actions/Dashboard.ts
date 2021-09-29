import { reduxRequestActionGenerator } from '../../@crema/utility/Utils';
import { Statistic, Order, Summary, Seller } from '../models/Dashboard';

const scope = 'dashboard';

export const FETCH_STATISTIC = reduxRequestActionGenerator(scope, 'FETCH_STATISTIC');

export interface FetchStatisticAction {
  type: typeof FETCH_STATISTIC.pending;
}

export interface FetchStatisticSuccessAction {
  type: typeof FETCH_STATISTIC.success;
  payload: Statistic[];
}
export interface FetchStatisticFailedAction {
  type: typeof FETCH_STATISTIC.error;
  message: string;
}

export const FETCH_ORDERS = reduxRequestActionGenerator(scope, 'FETCH_ORDERS');

export interface FetchOrdersAction {
  type: typeof FETCH_ORDERS.pending;
  payload: {
    fromDate: string;
    toDate: string;
  };
}

export interface FetchOrdersSuccessAction {
  type: typeof FETCH_ORDERS.success;
  payload: Order[];
}
export interface FetchOrdersFailedAction {
  type: typeof FETCH_ORDERS.error;
  message: string;
}

export const FETCH_SUMMARY = reduxRequestActionGenerator(scope, 'FETCH_SUMMARY');

export interface FetSummaryAction {
  type: typeof FETCH_SUMMARY.pending;
}

export interface FetSummarySuccessAction {
  type: typeof FETCH_SUMMARY.success;
  payload: Summary;
}
export interface FetSummaryFailedAction {
  type: typeof FETCH_SUMMARY.error;
  message: string;
}

export const FETCH_STATISTIC_CHART = reduxRequestActionGenerator(scope, 'FETCH_STATISTIC_CHART');

export interface FetchStatisticChartAction {
  type: typeof FETCH_STATISTIC_CHART.pending;
}

export interface FetchStatisticChartSuccessAction {
  type: typeof FETCH_STATISTIC_CHART.success;
  payload: Statistic[];
}
export interface FetchStatisticChartFailedAction {
  type: typeof FETCH_STATISTIC_CHART.error;
  message: string;
}

export const FETCH_SELLERS = reduxRequestActionGenerator(scope, 'FETCH_SELLERS');

export interface FetchSellersAction {
  type: typeof FETCH_SELLERS.pending;
}

export interface FetchSellersSuccessAction {
  type: typeof FETCH_SELLERS.success;
  payload: Seller[];
}
export interface FetchSellersFailedAction {
  type: typeof FETCH_SELLERS.error;
  message: string;
}

export const CREATE_SELLER = reduxRequestActionGenerator(scope, 'CREATE_SELLER');

export interface CreateSellerAction {
  type: typeof CREATE_SELLER.pending;
}

export interface CreateSellerSuccessAction {
  type: typeof CREATE_SELLER.success;
  payload: Seller;
}
export interface CreateSellerFailedAction {
  type: typeof CREATE_SELLER.error;
  message: string;
}

export const RESET_CREATE_SELLER_STATUS = reduxRequestActionGenerator(scope, 'RESET_CREATE_SELLER_STATUS');
export interface ResetCreateUserAction {
  type: typeof CREATE_SELLER.pending;
}

export type DashboardActionTypes =
  | FetchStatisticAction
  | FetchStatisticSuccessAction
  | FetchStatisticFailedAction
  | FetchOrdersAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailedAction
  | FetSummaryAction
  | FetSummarySuccessAction
  | FetSummaryFailedAction
  | FetchStatisticChartAction
  | FetchStatisticChartSuccessAction
  | FetchStatisticChartFailedAction
  | FetchSellersAction
  | FetchSellersSuccessAction
  | FetchSellersFailedAction
  | CreateSellerAction
  | CreateSellerSuccessAction
  | CreateSellerFailedAction
  | ResetCreateUserAction;
