import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';
import { Menu } from '../menu/service';

interface PlainObject {}

export interface User {
  id?: number;

  name: string;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  role?: {
    id: number;
    name: string;
  };

  status: number;
}

export interface UserSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  account?: string;
  mobile?: number;
}

export function apiGetUserList(params?: UserSearchParams) {
  return request<QueryListResponseData<User>>({
    method: 'GET',
    url: '/user',
    params,
  });
}

export function apiUpdateUser(data: User) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/user',
    data,
  });
}

export function apiCreateUser(data: User) {
  return request<PlainObject>({
    method: 'POST',
    url: '/user',
    data,
  });
}

export function apiRemoveUser(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/user/${id}`,
  });
}

export function apiGetMenuListByUserId(id: number) {
  return request<{ list: Menu[]; ids: number[] }>({
    method: 'GET',
    url: `/user/menu/${id}`,
  });
}

export function apiUpdateMenuListByUserId(userId: number, menuIds: number[]) {
  return request<PlainObject>({
    method: 'PUT',
    url: `/user/menu/${userId}`,
    data: {
      menuIds,
    },
  });
}
