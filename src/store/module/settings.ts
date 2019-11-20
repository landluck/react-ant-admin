import { Reducer } from 'redux';
import { IAction } from '../types';
import AdminConfig, { Config } from '../../config';

export interface Settings {
  fixedHeader: boolean;

  tagsView: boolean;

  layout: Config['layout'];

  theme: MenuTheme;

  contentWidth: Config['contentWidth'];

  colorWeak: boolean;
}

type MenuTheme = 'dark' | 'light';

const defaults: Settings = {
  fixedHeader: AdminConfig.fixedHeader,

  tagsView: true,

  layout: AdminConfig.layout,

  theme: AdminConfig.theme,

  contentWidth: AdminConfig.contentWidth,

  colorWeak: AdminConfig.colorWeak,
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
