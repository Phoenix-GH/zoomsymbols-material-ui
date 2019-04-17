import * as actions from '../actions';

// Worker triggering actionCreators
export function getMarketsWatcher(payload, resolve, reject) {

  return { type: actions.GET_MARKETS_WATCHER, payload, resolve,  reject};
}

// Redux state changing actionCreators
export function fillMarkets(markets) {
  return { type: actions.FILL_MARKETS, payload: markets };
}

export function getMarketRowsWatcher(payload, resolve, reject) {

  return { type: actions.GET_MARKET_ROWS_WATCHER, payload, resolve, reject};
}

// Redux state changing actionCreators
export function fillMarketRows(rows) {
  return { type: actions.FILL_MARKET_ROWS, payload: rows };
}

export function putError(error) {
  return { type: actions.MARKETS_ERROR, payload: error };
}