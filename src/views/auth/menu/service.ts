import { request } from '../../../api/request';
import { QueryListResponseData, PageQueryParams } from '../../../typings';

interface PlaceObject {}

export interface Menu {
  id: string;

  name: string;

  url: string;

  icon: string;

  desc: string;

  sort: number;

  parentId: number;

  level: number;

  parent?: Menu;
}

export interface MenuSearchParams extends PageQueryParams {
  name?: string;
  id?: number;
  url?: string;
  level?: number;
}

export function apiGetMenuList(params?: MenuSearchParams) {
  return request<QueryListResponseData<Menu>>({
    method: 'GET',
    url: '/menu',
    params,
  });
}

export function apiRemoveMenu(id: string) {
  return request<PlaceObject>({
    method: 'DELETE',
    url: `/menu/${id}`,
  });
}
