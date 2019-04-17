import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../utils/axios';
import * as actions from '../actions';
import config from '../../config';
import {
  fillUserProfile,
  authError,
  clearSession
} from '../actionCreators/session';

/**
 * Login Operation using saga
 */
// Login API
function loginApi(authParams) {
  return axios.request({
    method: 'post',
    url: `${config.baseURI}/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: authParams
  });
}
// Saga function that handles the side effect when the loginActionWatcher is triggered
export function* loginActionEffect(loginAction) {
  let { payload, resolve, reject } = loginAction;

  try {
    let { data } = yield call(loginApi, payload);
    if(data.access_token) {
      Object.keys(data.access_token).forEach(key => {
        localStorage.setItem(key, data.access_token[key]);
      });
      yield put(fillUserProfile(data.access_token));
      yield put(push('/'));
    }
    if (resolve) resolve();
  } catch (e) {
    yield put(authError(e));
    if (reject) reject(e);
  }
}
// Saga function that is initiated in the beginning to be able to listen to LOG_IN_WATCHER action
export function* loginActionWatcher() {
  yield takeLatest(actions.LOG_IN_WATCHER, loginActionEffect);
}


/**
 * Logout Operation using saga
 */
// Saga function that handles the side effect when the logoutActionWatcher is triggered
export function* logoutActionEffect() {
  try {
    localStorage.clear();
    yield put(clearSession());
    yield put(push('/login'));
  } catch (e) {
    console.log(e.message || 'Logout Error');
  }
}
// Saga function that is initiated in the beginning to be able to listen to LOG_OUT_WATCHER action
export function* logoutActionWatcher() {
  yield takeLatest(actions.LOG_OUT_WATCHER, logoutActionEffect);
}
