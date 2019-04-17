
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
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
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// Saga function that handles the side effect when the fetchMembersActionWatcher is triggered
export function* fetchMenuActionEffect(fetchMenuAction) {
  let { resolve, reject } = fetchMenuAction;
  try {
    let menu = yield call(fetchMenuApi, fetchMenuAction.payload);
    console.log('menu---', menu);
    yield put(fillMenu(menu.data));
    if (resolve) resolve();
  } catch (e) {
    yield put(putError(e));
    console.log(e || 'Fetch Menu Error');
    yield put(push('/login'));
    if (reject) reject(e);
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_MEMBERS_WATCHER action
export function* fetchMenuActionWatcher() {
  yield takeLatest(actions.GET_MENU_WATCHER, fetchMenuActionEffect);
}
