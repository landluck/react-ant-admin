import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IRoute } from './router/config';
import { layoutRouteList } from './router/utils';

import './styles/index.less';

function App() {
  return (
    <Router>
      <Switch>
        {layoutRouteList.map((route: IRoute) => (
          <Route key={route.path} path={route.path} component={route.component}></Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
