import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  isInGameFlow: false
};

const appReducer = createReducer(initialState, {
  [ActionTypes.ON_ENTER_GAME_FLOW](state) {
    return {
      ...state,
      isInGameFlow: true
    };
  }
});


export default appReducer;
