import {
  SET_INITIAL_PATH,
  SettingsActionTypes,
  TOGGLE_NAV_COLLAPSED,
  SET_INITIAL_URL,
} from '../../types/actions/Settings.action';

export const toggleNavCollapsed = () => ({ type: TOGGLE_NAV_COLLAPSED });

export const setInitialPath = (initialPath: string | undefined): SettingsActionTypes => ({
  type: SET_INITIAL_PATH,
  initialPath,
});

export const setInitialUrl = (payload: string): SettingsActionTypes => ({
  type: SET_INITIAL_URL,
  payload,
});
