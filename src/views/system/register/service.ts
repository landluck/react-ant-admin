import { request } from '../../../api/request';

interface PlainObject {}

export interface CreateUserData {
  account: string;
  password: string;
  mobile: string;
  code: string;
}

export interface CreateUserResponse {
  id: number;
}

export function apiCreateUser(data: CreateUserData) {
  return request<CreateUserResponse>({
    method: 'POST',
    url: '/user/register',
    data,
  });
}
