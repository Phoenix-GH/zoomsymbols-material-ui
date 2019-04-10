import * as actions from '../actions';

// Worker triggering actionCreators
export function getMarketsWatcher(params) {
  return { type: actions.GET_MARKETS_WATCHER, payload: params };
}

// Redux state changing actionCreators
export function fillMarkets(markets) {
  return { type: actions.FILL_MARKETS, payload: markets };
}

export function getMarketRowsWatcher(params) {
  return { type: actions.GET_MARKET_ROWS_WATCHER, payload: params };
}

// Redux state changing actionCreators
export function fillMarketRows(rows) {
  return { type: actions.FILL_MARKET_ROWS, payload: rows };
}

export function putError(error) {
  return { type: actions.MARKETS_ERROR, payload: error };
}