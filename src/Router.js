import React from 'react';
import { history } from './store';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Login from './containers/Login';
import Logout from './containers/Logout';
import AppRoot from './appRoot/AppRoot';
import PrivateRoute from './components/PrivateRoute';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/logout'} component={Logout} />
      <PrivateRoute path={'/'} component={AppRoot} />
      <Route component={() => <Redirect to="/login" />} />
    </Switch>
  </ConnectedRouter>
);

export default Router;