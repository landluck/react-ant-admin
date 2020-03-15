import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlainObject {}

export interface Menu {
  id?: number;

  name: string;

  url: string;

  icon: string;

  desc?: string;

  sort: number;

  parentId: number;

  level: number;

  parent?: Menu;

  children?: Menu[];

  parentIds?: number[];
}

export interface MenuSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  url?: string;
  level?: number;
  parentId?: number;
}

export function apiGetMenuList(params?: MenuSearchParams) {
  return request<QueryListResponseData<Menu>>({
    method: 'GET',
    url: '/menu',
    params,
  });
}

export function apiUpdateMenu(data: Menu) {
  return request<PlainObject>({
    method: 'PUT',
    url: '/menu',
    data,
  });
}

export function apiCreateMenu(data: Menu) {
  return request<PlainObject>({
    method: 'POST',
    url: '/menu',
    data,
  });
}

export function apiGetMenuCascader() {
  return request<Menu[]>({
    method: 'GET',
    url: '/menu/cascader',
  });
}

export function apiRemoveMenu(id: number) {
  return request<PlainObject>({
    method: 'DELETE',
    url: `/menu/${id}`,
  });
}
