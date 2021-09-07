import Settings from './Setting';
import CommonReducer from './CommonReducer';
import Auth from './Auth';
import DashboardReducer from './Dashboard';

const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  dashboard: DashboardReducer,
};

export default reducers;
