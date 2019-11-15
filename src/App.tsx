import React from 'react';
import routes, { IRoute } from './router/config'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/index.less'


function App () {
  return (
    <Router>
      <Switch>
        {
          routes.map((route: IRoute) => (
            <Route key={route.path} exact={route.path === '/'} path={route.path} component={route.component}></Route>
          ))
        }
      </Switch>
    </Router>
  )
}

export default App;
