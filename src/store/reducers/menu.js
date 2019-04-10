import * as actions from '../actions';

const initialState = {
  menu: null,
  error: null,
};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILL_MENU:
      return {
        ...state,
        menu: { ...action.payload },
        action: action.type,
      };
    default:
      return state;
  }
};

export default menu;