import { UserState } from './module/user'
import { AppState } from './module/app'
import { Settings } from './module/settings'

export interface IStoreState {
  app: AppState,
  user: UserState
  settings: Settings
}

export interface IAction<T> {
  type: string,
  payload: T
}