
import { call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../utils/axios';
import * as actions from '../actions';
import config from '../../config';
import {
  fillMenu,
  putError,
} from '../actionCreators/menu';

/**
 * Fetch Markets Operation using saga
 */
// Markets API
function fetchMenuApi(params) {
  return axios.request({
    method: 'get',
    url: `${config.baseURI}/api/ui/getApplications?isMobile=true`,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// Saga function that handles the side effect when the fetchMembersActionWatcher is triggered
export function* fetchMenuActionEffect(fetchMenuAction) {
  try {
    let menu = yield call(fetchMenuApi, fetchMenuAction.payload);
    console.log('menu---', menu);
    yield put(fillMenu(menu.data));
  } catch (e) {
    yield put(putError(e));
    console.log(e || 'Fetch Markets Error');
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_MEMBERS_WATCHER action
export function* fetchMenuActionWatcher() {
  yield takeLatest(actions.GET_MENU_WATCHER, fetchMenuActionEffect);
}
