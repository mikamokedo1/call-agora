import { reduxRequestActionGenerator } from '../../@crema/utility/Utils';
import { Statistic, Order, Summary } from '../models/Dashboard';

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

export type DashboardActionTypes =
  | FetchStatisticAction
  | FetchStatisticSuccessAction
  | FetchStatisticFailedAction
  | FetchOrdersAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailedAction
  | FetSummaryAction
  | FetSummarySuccessAction
  | FetSummaryFailedAction;
