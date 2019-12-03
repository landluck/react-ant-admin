import { request } from '../../../api/request';
import { UserState } from '../../../store/module/user';

interface PlainObject {}

export interface UserLoginData {
  account: string;
  password: string;
}

export function apiUserLogin(data: UserLoginData) {
  return request<UserState>({
    method: 'POST',
    url: '/user/login',
    data,
  });
}

interface UserLoginByMobileData {
  mobile: string;
  code: number;
}

export function apiUserLoginByMobile(data: UserLoginByMobileData) {
  return request<UserState>({
    method: 'POST',
    url: '/user/login-mobile',
    data,
  });
}

interface MobileLoginiData {
  mobile: string;
}

export function apiGetVerifyCode(data: MobileLoginiData) {
  return request<PlainObject>({
    method: 'POST',
    url: '/sms',
    data,
  });
}
