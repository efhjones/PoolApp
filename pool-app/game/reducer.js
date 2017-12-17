import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  id: null,
  players: []
};

const gameReducer = createReducer(initialState, {
  [ActionTypes.ON_ADD_PLAYER](state, { playerId }) {
    return {
      ...state,
      players: state.players.concat(playerId)
    };
  },
  [ActionTypes.ON_SET_GAME_ID](state, { id }) {
    return {
      ...state,
      id
    };
  },
  [ActionTypes.SEED_STORE_PLAYERS](state, { players }) {
    return {
      ...state,
      players: state.players.concat(players)
    };
  }
});


export default gameReducer;
