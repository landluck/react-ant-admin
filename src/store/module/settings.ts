import { Reducer } from 'redux';
import { IAction } from '../types';
import AdminConfig, { Config } from '../../config';
import LocalStore from '../../utils/store';

export interface Settings {
  fixedHeader: boolean;

  layout: Config['layout'];

  theme: MenuTheme;

  contentWidth: Config['contentWidth'];

  colorWeak: boolean;
}

type MenuTheme = 'dark' | 'light';

const SETTINGS_KEY = 'React-ant-Admin-Settings';

const localSettings = LocalStore.getValue<Settings>(SETTINGS_KEY) || {};

const defaults: Settings = {
  fixedHeader: AdminConfig.fixedHeader,

  layout: AdminConfig.layout,

  theme: AdminConfig.theme,

  contentWidth: AdminConfig.contentWidth,

  colorWeak: AdminConfig.colorWeak,

  ...localSettings,
};

const UPDATE_SETTINSG = 'UPDATE_SETTINSG';

export const updateLayoutSettings: (settings: Settings) => IAction<Settings> = (
  settings: Settings,
) => ({
  type: UPDATE_SETTINSG,
  payload: settings,
});

const settingsReducer: Reducer<Settings, IAction<any>> = (
  state = defaults,
  action: IAction<any>,
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SETTINSG:
      LocalStore.setValue(SETTINGS_KEY, payload as Settings);

      return {
        ...payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default settingsReducer;
