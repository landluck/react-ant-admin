import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IRoute } from './router/config';
import { layoutRouteList } from './router/utils';

import './styles/index.less';

function App() {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router>
        <Switch>
          {layoutRouteList.map((route: IRoute) => (
            <Route key={route.path} path={route.path} component={route.component}></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
