import routes from './config';

export function getPageTitle(): string {
  const path = window.location.pathname;

  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];

    const target = route.children && route.children.find(child => child.path === path);

    if (target) {
      return target.meta.title;
    }
  }

  return '';
}
