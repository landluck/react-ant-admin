import routes, { IRoute } from './config';

function findRoutsByPaths(pathList: string[]): IRoute[] {
  const result: IRoute[] = [];

  let route: IRoute | undefined = routes.find((child: IRoute) => child.path === '/');

  for (let i = 0; i < pathList.length; i += 1) {
    if (route && route.children) {
      const target = route.children.find((child: IRoute) => child.path === pathList[i]);

      if (target) {
        route = target;

        result.push(target);
      }
    }
  }

  return result;
}

export function getPageTitle(): string {
  const paths = getPagePathList();

  const targetRouts = findRoutsByPaths(paths);

  const route = targetRouts.pop();

  return route ? route.meta.title : '';
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}

export function getBreadcrumbs(): IRoute[] {
  const result = [];

  const home = routes.find((child: IRoute) => child.path === '/');

  if (home) {
    result.push(home);
  }

  return result.concat(findRoutsByPaths(getPagePathList()));
}
