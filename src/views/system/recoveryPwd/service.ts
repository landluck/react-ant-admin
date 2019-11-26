import { request } from '../../../api/request';

interface PlaceObject {}

export interface UpdateUserPwdData {
  password: string;
  mobile: string;
  code: string;
}

export function apiUpdateUserPwd(data: UpdateUserPwdData) {
  return request<PlaceObject>({
    method: 'PUT',
    url: '/user/pwd',
    data,
  });
}
