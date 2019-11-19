import { Reducer } from 'redux';
import { IAction } from '../types';
import AdminConfig, { Config } from '../../config';

export interface Settings {
  fixedHeader: boolean;

  tagsView: boolean;

  layout: Config['layout'];

  theme: MenuTheme;

  contentWidth: Config['contentWidth'];
}

type MenuTheme = 'dark' | 'light';

const defaults: Settings = {
  fixedHeader: AdminConfig.fixedHeader,

  tagsView: true,

  layout: AdminConfig.layout,

  theme: AdminConfig.theme,

  contentWidth: AdminConfig.contentWidth,
};

// const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED'

const settingsReducer: Reducer<Settings, IAction<any>> = (
  state = defaults,
  action: IAction<any>,
) => {
  const { type } = action;

  switch (type) {
    default:
      return {
        ...state,
      };
  }
};

export default settingsReducer;
