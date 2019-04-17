import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Markets from 'containers/Markets';

function Router() {
  return (
    <Switch>
      <PrivateRoute exact path={"/Markets"} component={Markets} />
    </Switch>
  )
}

export default Router;