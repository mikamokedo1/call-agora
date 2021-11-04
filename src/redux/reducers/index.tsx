import Settings from './Setting';
import CommonReducer from './CommonReducer';
import Auth from './Auth';
import DashboardReducer from './Dashboard';
import TicketReducer from './Ticket';
import ChatReducer from './Chat';

const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  dashboard: DashboardReducer,
  ticket: TicketReducer,
  chat: ChatReducer,
};

export default reducers;
