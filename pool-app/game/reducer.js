import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  id: null,
  players: {},
  teams: [],
  inProgress: false
};

const gameReducer = createReducer(initialState, {
  [ActionTypes.ON_SET_GAME_ID](state, { id }) {
    return {
      ...state,
      id
    };
  },
  [ActionTypes.UPDATE_TEAM_PLAYERS](state, { team }) {
    const teams = _.map(state.teams, (stateTeam) => {
      if (stateTeam.id === team.id) {
        return {
          ...stateTeam,
          players: team.players
        };
      }
      return stateTeam;
    });
    return {
      ...state,
      players: {
        ...playerObjs
      }
    };
  }
});

export default gameReducer;
