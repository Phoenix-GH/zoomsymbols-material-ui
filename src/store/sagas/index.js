import { all } from 'redux-saga/effects';
import {
  loginActionWatcher,
  logoutActionWatcher,
} from './session';

import {
  fetchMarketsActionWatcher,
  fetchMarketRowsActionWatcher,
} from './markets';

import {
  fetchMenuActionWatcher,
} from './menu';

export default function* rootSaga() {
  yield all([
    loginActionWatcher(),
    logoutActionWatcher(),
    fetchMarketsActionWatcher(),
    fetchMarketRowsActionWatcher(),
    fetchMenuActionWatcher(),
  ]);
}