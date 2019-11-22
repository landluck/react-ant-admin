import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { IRoute } from '../router/config';
import { getToken } from '../utils/auth';
import store from '../store/index';
import { businessRouteList, getPageTitle } from '../router/utils';

function checkAuth(location: RouteComponentProps['location']): boolean {
  // redux 中的 routes 同时负责渲染 sidebar
  const { flattenRoutes } = store.getState().app;

  // 判断当前访问路由是否在系统路由中, 不存在直接走最后默认的 404 路由
  const route = businessRouteList.find(child => child.path === location.pathname);

  if (!route) {
    return true;
  }

  if (route.path.indexOf('error') !== -1) {
    return true;
  }

  // 路由存在于系统中，查看该用户是否有此路由权限
  if (!flattenRoutes.find(child => child.path === location.pathname)) {
    return false;
  }

  return true;
}

function renderRoute(route: IRoute) {
  const title = getPageTitle(businessRouteList);

  return (
    <Route
      key={route.path}
      exact={route.path !== '*'}
      path={route.path}
      render={({ location }) => {
        // 未登录
        if (!getToken()) {
          return (
            <Redirect
              to={`/system-user/login?redirect=${encodeURIComponent(
                location.pathname + location.search,
              )}`}
            />
          );
        }

        // 检查授权

        if (!checkAuth(location)) {
          return <Redirect to="/error/403" push />;
        }

        return route.redirect ? (
          <Redirect to={route.redirect!} push />
        ) : (
          <>
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={title} />
            </Helmet>
            <route.component />
          </>
        );
      }}
    ></Route>
  );
}

function renderRouteList(): React.ReactNode {
  const result: React.ReactNode[] = [];

  businessRouteList.forEach((child: IRoute) => {
    result.push(renderRoute(child));
  });

  return result;
}

function MainRoutes() {
  return <Switch>{renderRouteList()}</Switch>;
}

export default MainRoutes;
