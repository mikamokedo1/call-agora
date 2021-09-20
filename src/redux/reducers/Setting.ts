import { Setting } from '../../types/models/Setting';
import {
  ROUTE_CHANGE,
  SET_INITIAL_PATH,
  SettingsActionTypes,
  TOGGLE_NAV_COLLAPSED,
  SET_INITIAL_URL,
} from '../../types/actions/Settings.action';

const initialSettings: Setting = {
  navCollapsed: false,
  initialPath: '/',
  inititalUrl: '/',
};

const Settings = (state = initialSettings, action: SettingsActionTypes) => {
  switch (action.type) {
    case ROUTE_CHANGE:
      return {
        ...state,
        navCollapsed: false,
      };

    case TOGGLE_NAV_COLLAPSED:
      return {
        ...state,
        navCollapsed: !state.navCollapsed,
      };

    case SET_INITIAL_PATH:
      return {
        ...state,
        initialPath: action.initialPath,
      };
    case SET_INITIAL_URL:
      return {
        ...state,
        initialPath: action.payload,
      };

    default:
      return state;
  }
};

export default Settings;
