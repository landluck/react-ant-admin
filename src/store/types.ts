import { UserState } from './module/user';
import { AppState } from './module/app';
import { Settings } from './module/settings';
import { NoticeState } from './module/notice';

export interface IStoreState {
  app: AppState;
  user: UserState;
  settings: Settings;
  notices: NoticeState;
}

export interface IAction<T> {
  type: string;
  payload: T;
}
