import { AnyAction } from 'redux';
import { Ticket } from '../../types/models/Ticket';
import {
  FETCH_DEPARTMENT_LIST,
  FETCH_RELATED_SERVICES_LIST,
  SEND_TICKET,
  FETCH_PRIORITY,
} from '../../types/actions/Ticket.action';
import { AppState } from '../store/index';

const initialTicket: Ticket = {
  departments: [],
  relatedServices: [],
  priority: [],
  loading: {
    sendTicket: false,
  },
  errors: {
    sendTicket: null,
  },
};

const TicketReducer = (state = initialTicket, action: AnyAction): Ticket => {
  switch (action.type) {
    case FETCH_DEPARTMENT_LIST.success:
      return { ...state, departments: action.payload };
    case FETCH_RELATED_SERVICES_LIST.success:
      return { ...state, relatedServices: action.payload };
    case FETCH_PRIORITY.success:
      return { ...state, priority: action.payload };
    case SEND_TICKET.pending:
      return {
        ...state,
        loading: { ...state.loading, sendTicket: true },
        errors: { ...state.errors, sendTicket: null },
      };
    case SEND_TICKET.success:
      return {
        ...state,
        loading: { ...state.loading, sendTicket: false },
        errors: { ...state.errors, sendTicket: null },
      };
    case SEND_TICKET.error:
      return {
        ...state,
        loading: { ...state.loading, sendTicket: false },
        errors: { ...state.errors, sendTicket: action.message },
      };

    default:
      return state;
  }
};

export default TicketReducer;

export const departmentsSelector = (state: AppState) => state.ticket.departments;
export const relatedServicesSelector = (state: AppState) => state.ticket.relatedServices;
export const prioritySelector = (state: AppState) => state.ticket.priority;
export const isLoadingSendTicketSelector = (state: AppState) => state.ticket.loading.sendTicket;
export const isErrorSendTicketSelector = (state: AppState) => state.ticket.errors.sendTicket;
