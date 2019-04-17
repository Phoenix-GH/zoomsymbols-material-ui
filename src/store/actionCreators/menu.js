import * as actions from '../actions';

// Worker triggering actionCreators
export function getMenuWatcher(payload, resolve, reject) {
  return { type: actions.GET_MENU_WATCHER, payload, resolve, reject };
}

// Redux state changing actionCreators
export function fillMenu(menu) {
  return { type: actions.FILL_MENU, payload: menu };
}

export function putError(error) {
  return { type: actions.MARKETS_ERROR, payload: error };
}