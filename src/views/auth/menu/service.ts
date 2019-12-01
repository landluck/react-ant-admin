import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlaceObject {}

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
  return request<PlaceObject>({
    method: 'PUT',
    url: '/menu',
    data,
  });
}

export function apiCreateMenu(data: Menu) {
  return request<PlaceObject>({
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
  return request<PlaceObject>({
    method: 'DELETE',
    url: `/menu/${id}`,
  });
}
