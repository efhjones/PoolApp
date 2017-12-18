import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  id: null,
  players: {}
};

const gameReducer = createReducer(initialState, {
  [ActionTypes.ON_SET_GAME_ID](state, { id }) {
    return {
      ...state,
      id
    };
  },
  [ActionTypes.UPDATE_PLAYERS](state, { players }) {
    const playerObjs = _.keyBy(players, player => player.id);
    return {
      ...state,
      players: {
        ...playerObjs
      }
    };
  }
});

export default gameReducer;
