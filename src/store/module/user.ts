import { Reducer } from 'redux';
import { IAction } from '../types';
import { getToken, setToken } from '../../utils/cookie';
import LocalStore from '../../utils/store';

export interface UserState {
  token: string;
  avatar: string | undefined;
  account: string;
  mobile: string;
  role: number;
  id: number;
}

const USER_KEY = 'React-ant-Admin-user';

const localUser = LocalStore.getValue<UserState>(USER_KEY) || {};

const defaultUser: UserState = {
  token: getToken(),
  avatar: undefined,
  account: '',
  mobile: '',
  role: 0,
  id: 0,
  ...localUser,
};

const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
  type: SET_USER_INFO,
  payload: user,
});

const userReducer: Reducer<UserState, IAction<any>> = (
  state = defaultUser,
  action: IAction<any>,
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_INFO:
      setToken(payload.token);
      LocalStore.setValue(USER_KEY, payload);
      return {
        ...payload,
      };
    default:
      return state;
  }
};

export default userReducer;
