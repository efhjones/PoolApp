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
      teams
    };
  },
  [ActionTypes.REMOVE_TEAM](state, { id }) {
    const { teams } = state;
    const newTeams = _.compact(teams.map((stateTeam) => {
      if (stateTeam.id === id) {
        return null;
      }
      return stateTeam;
    }));
    return {
      ...state,
      teams: newTeams
    };
  },
  [ActionTypes.UPDATE_GAME](state, { game }) {
    return {
      ...state,
      ...game
    };
  },
  [ActionTypes.DELETE_GAME](state) {
    return {
      ...state,
      ...initialState
    };
  }
});

export default gameReducer;
