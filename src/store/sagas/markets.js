import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import axios from '../../utils/axios';
import * as actions from '../actions';
import config from '../../config';
import {
  fillMarkets,
  fillMarketRows,
  putError,
} from '../actionCreators/markets';

/**
 * Fetch Markets Operation using saga
 */
// Markets API
function fetchMarketsApi(params) {
  return axios.request({
    method: 'get',
    url: `${config.baseURI}/api/mobile/getMarketsPage`,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// Saga function that handles the side effect when the fetchMembersActionWatcher is triggered
export function* fetchMarketsActionEffect(fetchMarketsAction) {
  let { payload, resolve, reject } = fetchMarketsAction;
  try {
    let markets = yield call(fetchMarketsApi, payload);

    yield put(fillMarkets(markets.data));
    if (resolve) resolve();
  } catch (e) {
    yield put(putError(e));
    if (reject) reject(e);
    console.log(e || 'Fetch Markets Error');
    yield put(push('/login'));
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_MEMBERS_WATCHER action
export function* fetchMarketsActionWatcher() {
  yield takeLatest(actions.GET_MARKETS_WATCHER, fetchMarketsActionEffect);
}

/**
 * Fetch Market rows Operation using saga
 */
// Markets API
function fetchMarketRowsApi(params) {
  return axios.request({
    method: 'get',
    url: `${config.baseURI}/api/mobile/getMarketsPageGridRows`,
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
// Saga function that handles the side effect when the fetchMembersActionWatcher is triggered
export function* fetchMarketRowsActionEffect(fetchMarketRowsAction) {
  let { payload, resolve, reject } = fetchMarketRowsAction;

  try {
    let rows = yield call(fetchMarketRowsApi, payload);
    yield put(fillMarketRows(rows.data));
    if (resolve) resolve();
  } catch (e) {
    yield put(putError(e));
    console.log(e || 'Fetch Market rows Error');
    yield put(push('/login'));
    if (reject) reject(e);
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_MEMBERS_WATCHER action
export function* fetchMarketRowsActionWatcher() {
  yield takeLatest(actions.GET_MARKET_ROWS_WATCHER, fetchMarketRowsActionEffect);
}
