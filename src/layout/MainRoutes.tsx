import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Result, Button } from 'antd';
import routes, { IRoute } from '../router/config';

function renderRoute(route: IRoute) {
  if (route.redirect) {
    return (
      <Route
        exact
        key={route.path}
        path={route.path}
        render={() => (route.redirect ? <Redirect to={route.redirect} push /> : null)}
      ></Route>
    );
  }

  return <Route exact key={route.path} path={route.path} component={route.component}></Route>;
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
