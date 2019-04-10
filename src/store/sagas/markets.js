
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
  try {
    let markets = yield call(fetchMarketsApi, fetchMarketsAction.payload);
    console.log('markets---', markets);
    yield put(fillMarkets(markets.data));
  } catch (e) {
    yield put(putError(e));
    console.log(e || 'Fetch Markets Error');
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
  console.log('params----', params);
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
  try {
    let rows = yield call(fetchMarketRowsApi, fetchMarketRowsAction.payload);
    console.log('market rows---', rows);
    yield put(fillMarketRows(rows.data));
  } catch (e) {
    yield put(putError(e));
    console.log(e || 'Fetch Market rows Error');
  }
}
// Saga function that is initiated in the beginning to be able to listen to GET_MEMBERS_WATCHER action
export function* fetchMarketRowsActionWatcher() {
  yield takeLatest(actions.GET_MARKET_ROWS_WATCHER, fetchMarketRowsActionEffect);
}
