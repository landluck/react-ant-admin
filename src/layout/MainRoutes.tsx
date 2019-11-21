import React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { Result, Button } from 'antd';
import routes, { IRoute } from '../router/config';
// import { getToken } from '../utils/auth';
import store from '../store/index';
import { getPagePathList } from '../router/utils';

function checkAuth(location: RouteComponentProps['location']): boolean {
  // redux 中的 routes 同时负责渲染 sidebar
  const { routes: routeList } = store.getState().app;

  // debugger
  // 解析当前路由的 pathname，判断这些路由是否在路由权限中
  const pathList: string[] = getPagePathList(location.pathname);

  let route: IRoute | undefined = routeList.find(child => child.path === pathList[0]);

  if (!route) return false;

  for (let i = 1; i < pathList.length; i += 1) {
    const path = pathList[i];

    if (route && route.children) {
      const target: IRoute | undefined = route.children.find(child => child.path === path);

      if (!target) return false;

      route = target;
    }
  }

  return true;
}

function renderRoute(route: IRoute) {
  return (
    <Route
      key={route.path}
      exact
      path={route.path}
      render={({ location }) => {
        // 未登录
        // if (!getToken()) {
        //   return (
        //     <Redirect
        //       to={`/system-user/login?redirect=${encodeURIComponent(
        //         location.pathname + location.search,
        //       )}`}
        //     />
        //   );
        // }

        // 检查授权

        if (!checkAuth(location)) {
          return <Redirect to="/error/404" />;
        }

        return route.redirect ? (
          <Redirect to={route.redirect!} push />
        ) : (
          <route.component></route.component>
        );
      }}
    ></Route>
  );
}

function renderRouteList(route: IRoute): React.ReactNode {
  let result: React.ReactNode[] = [];

  if (route.redirect) {
    result.push(renderRoute(route));
  }

  if (route.children) {
    route.children.forEach((item: IRoute) => {
      if (item.component && !item.children && !item.redirect) {
        result.push(renderRoute(item));

        return;
      }

      if (item.children) {
        result = result.concat(renderRouteList(item));
      }
    });
  }

  return result;
}

function MainRoutes() {
  const route: IRoute | undefined = routes.find(routeItem => routeItem.path === '/');

  if (!route || !route.children) {
    return (
      <Result
        status="warning"
        title="系统错误，请联系管理员"
        extra={
          <Button type="primary" key="console">
            Go Contact
          </Button>
        }
      />
    );
  }

  return <Switch>{renderRouteList(route)}</Switch>;
}

export default MainRoutes;
