import { Reducer } from 'redux';
import { IAction } from '../types';
import { IRoute } from '../../router/config';
import { routes } from '../../router/sidebar';
import { flattenRoute } from '../../router/utils';
import LocalStore from '../../utils/store';

export interface AppState {
  sidebar: {
    opened: boolean;
  };
  routes: IRoute[];

  flattenRoutes: IRoute[];
}

const defaultApp: AppState = {
  sidebar: {
    opened: LocalStore.getValue<boolean>('Admin-SideBar-Opened') || true,
  },
  routes,
  flattenRoutes: flattenRoute(routes, true, false),
};

const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED';

export const updateSideBar = (sidebar: AppState['sidebar']) => ({
  type: SET_SIDE_BAR_OPENED,
  payload: sidebar,
});

const appReducer: Reducer<AppState, IAction<any>> = (state = defaultApp, action: IAction<any>) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      return {
        ...state,
        sidebar: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
