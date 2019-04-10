import session from './session';
import markets from './markets';
import menu from './menu';

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

const rootReducer = combineReducers({
  session,
  markets,
  router,
  menu,
});

export default rootReducer;