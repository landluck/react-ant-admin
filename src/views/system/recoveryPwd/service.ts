import { request } from '../../../api/request';

interface PlainObject {}

export interface UpdateUserPwdData {
  password: string;
  mobile: string;
  code: string;
}

export function apiUpdateUserPwd(data: UpdateUserPwdData) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/user/pwd',
    data,
  });
}
