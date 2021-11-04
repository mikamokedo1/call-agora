import { CommonActionTypes } from './actions/Common.action';
import { SettingsActionTypes } from './actions/Settings.action';
import { AuthActions } from './actions/Auth.actions';
import { DashboardActionTypes } from './actions/Dashboard';
import { TicketTypes } from './actions/Ticket.action';

export type AppActions = CommonActionTypes | SettingsActionTypes | AuthActions | DashboardActionTypes | TicketTypes;
