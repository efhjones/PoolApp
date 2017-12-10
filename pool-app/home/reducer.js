import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  gameId: null,
  isInGameFlow: false
};

const appReducer = createReducer(initialState, {
  [ActionTypes.ON_SET_GAME_ID](state, { gameId }) {
    return {
      ...state,
      gameId
    };
  },
  [ActionTypes.ON_ENTER_GAME_FLOW](state) {
    return {
      ...state,
      isInGameFlow: true
    };
  }
});


export default appReducer;
