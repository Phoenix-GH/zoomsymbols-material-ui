import * as actions from '../actions';

const initialState = {
  markets: null,
  error: null,
  market_rows: null,
};

const markets = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILL_MARKETS:
      return {
        ...state,
        markets: { ...action.payload },
        action: action.type,
      };
    case actions.FILL_MARKET_ROWS:
      return {
        ...state,
        market_rows: { ...action.payload },
        action: action.type,
      };
    default:
      return state;
  }
};

export default markets;