import {HealthCare} from '../models/dashboards/HealthCare';

export const GET_ACADEMY_DATA = 'GET_ACADEMY_DATA';
export const GET_ECOMMERCE_DATA = 'GET_ECOMMERCE_DATA';
export const GET_HEALTH_CARE_DATA = 'GET_HEALTH_CARE_DATA';
export const GET_ANALYTICS_DATA = 'GET_ANALYTICS_DATA';
export const GET_CRM_DATA = 'GET_CRM_DATA';
export const GET_CRYPTO_DATA = 'GET_CRYPTO_DATA';
export const GET_METRICS_DATA = 'GET_METRICS_DATA';
export const GET_WIDGETS_DATA = 'GET_WIDGETS_DATA';

export interface GetHeathCareAction {
  type: typeof GET_HEALTH_CARE_DATA;
  payload: HealthCare;
}

export interface GetCryptosAction {
  type: typeof GET_CRYPTO_DATA;
  payload: Crypto;
}



export type DashboardActionTypes =
  | GetHeathCareAction
  | GetCryptosAction
