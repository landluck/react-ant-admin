import routes, { IRoute } from './config';

export function flattenRoute(routeList: IRoute[], deep?: boolean): IRoute[] {
  const result: IRoute[] = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep));
    } else {
      result.push(route);
    }
  }

  return result;
}

function getLayoutRouteList(): IRoute[] {
  return flattenRoute(routes, false);
}

function getBusinessRouteList(): IRoute[] {
  const routeList = routes.filter(route => route.path === '/');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true);
  }
  return [];
}

function getSystemRouteList(): IRoute[] {
  const routeList = routes.filter(route => route.path === '/system');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true);
  }
  return [];
}

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */

export const layoutRouteList = getLayoutRouteList();

export const businessRouteList = getBusinessRouteList();

export const systemRouteList = getSystemRouteList();

function findRoutesByPaths(pathList: string[], routeList: IRoute[]): IRoute[] {
  return routeList.filter((child: IRoute) => pathList.indexOf(child.path) !== -1);
}

export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find(child => child.path === window.location.pathname);

  return route ? route.meta.title : '';
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}

/**
 * 只有业务路由会有面包屑
 */
export function getBreadcrumbs(): IRoute[] {
  return findRoutesByPaths(getPagePathList(), businessRouteList);
}
