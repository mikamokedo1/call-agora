import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {
  FETCH_DEPARTMENT_LIST,
  FETCH_RELATED_SERVICES_LIST,
  ParamSendTicket,
  SEND_TICKET,
  FETCH_PRIORITY,
} from '../../types/actions/Ticket.action';
import { AppActions } from '../../types';

const ticketUrl = process.env.REACT_APP_API_TICKET_URL;

export const fetchDepartmentList = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_DEPARTMENT_LIST.pending });

      const res = await axios.get(`${ticketUrl}/department`);
      if (res) {
        dispatch({ type: FETCH_DEPARTMENT_LIST.success, payload: res.data });
      }
    } catch (error) {
      dispatch({ type: FETCH_DEPARTMENT_LIST.error, message: error });
    }
  };
};

export const fetchRelatedServices = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_RELATED_SERVICES_LIST.pending });
      const res = await axios.get(`${ticketUrl}/relatedServices`);
      if (res) {
        dispatch({ type: FETCH_RELATED_SERVICES_LIST.success, payload: res.data });
      }
    } catch (error) {
      dispatch({ type: FETCH_RELATED_SERVICES_LIST.error, message: error });
    }
  };
};

export const fetchPriority = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      dispatch({ type: FETCH_PRIORITY.pending });
      const res = await axios.get(`${ticketUrl}/priority`);
      if (res) {
        dispatch({ type: FETCH_PRIORITY.success, payload: res.data });
      }
    } catch (error) {
      dispatch({ type: FETCH_PRIORITY.error, message: error });
    }
  };
};

export const sendTicket = (ticket: ParamSendTicket) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const uid = uuidv4();
    jwtAxios.defaults.headers.common['x-requestid'] = uid;
    try {
      dispatch({ type: SEND_TICKET.pending });
      const res = await axios.post(`${ticketUrl}/ticket`, ticket);
      if (res) {
        dispatch({ type: SEND_TICKET.success, payload: res });
        toast.success('Đã gửi yêu cầu hổ trợ!');
      }
    } catch (error) {
      dispatch({ type: SEND_TICKET.error, message: error });
    }
  };
};
