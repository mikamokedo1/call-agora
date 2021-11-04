import { reduxRequestActionGenerator } from '../../@crema/utility/Utils';
import { Departments, RelatedServices, Prioriry } from '../models/Ticket';

const scope = 'ticket';

export const FETCH_DEPARTMENT_LIST = reduxRequestActionGenerator(scope, 'FETCH_DEPARTMENT_LIST');
export const FETCH_RELATED_SERVICES_LIST = reduxRequestActionGenerator(scope, 'FETCH_RELATED_SERVICES_LIST');
export const FETCH_PRIORITY = reduxRequestActionGenerator(scope, 'FETCH_PRIORITY');
export const SEND_TICKET = reduxRequestActionGenerator(scope, 'SEND_TICKET');

export interface FetchDepartmentListAction {
  type: typeof FETCH_DEPARTMENT_LIST.pending;
}

export interface FetchDepartmentListSuccessAction {
  type: typeof FETCH_DEPARTMENT_LIST.success;
  payload: Departments[];
}
export interface FetchDepartmentListFailedAction {
  type: typeof FETCH_DEPARTMENT_LIST.error;
  message: string;
}

export interface FetchRelatedServicesAction {
  type: typeof FETCH_RELATED_SERVICES_LIST.pending;
}

export interface FetchRelatedServicesSuccessAction {
  type: typeof FETCH_RELATED_SERVICES_LIST.success;
  payload: RelatedServices[];
}
export interface FetchRelatedServicesFailedAction {
  type: typeof FETCH_RELATED_SERVICES_LIST.error;
  message: string;
}
export interface FetchPriorityAction {
  type: typeof FETCH_PRIORITY.pending;
}

export interface FetchPrioritySuccessAction {
  type: typeof FETCH_PRIORITY.success;
  payload: Prioriry[];
}
export interface FetchPriorityFailedAction {
  type: typeof FETCH_PRIORITY.error;
  message: string;
}

export interface SendTicketAction {
  type: typeof SEND_TICKET.pending;
}

export interface SendTicketSuccessAction {
  type: typeof SEND_TICKET.success;
  payload: Departments[];
}
export interface SendTicketFailedAction {
  type: typeof SEND_TICKET.error;
  message: string;
}
export interface ParamSendTicket {
  subject: string;
  body: string;
  userId: string;
  userName: string;
  email: string;
  relatedServices: number;
  department: number;
  priority: number;
  image?: string[];
}

export type TicketTypes =
  | FetchDepartmentListAction
  | FetchDepartmentListSuccessAction
  | FetchDepartmentListFailedAction
  | FetchRelatedServicesAction
  | FetchRelatedServicesSuccessAction
  | FetchRelatedServicesFailedAction
  | FetchPriorityAction
  | FetchPrioritySuccessAction
  | FetchPriorityFailedAction
  | SendTicketAction
  | SendTicketSuccessAction
  | SendTicketFailedAction;
