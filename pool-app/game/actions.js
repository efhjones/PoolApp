import AsyncStorage from 'AsyncStorage';
import * as ActionTypes from './actionTypes';
import { CURRENT_GAME_TOKEN } from '../utils/constants';
import AppActions from '../app/actions';

const GameActions = {
  onSetGameId(id) {
    return dispatch => AsyncStorage.setItem(CURRENT_GAME_TOKEN, id, (err) => {
      if (err) {
        return dispatch(AppActions.onSetErrors(err));
      }
      return dispatch({
        type: ActionTypes.ON_SET_GAME_ID,
        id
      });
    });
  },
  updateTeamPlayers(team) {
    return {
      type: ActionTypes.UPDATE_TEAM_PLAYERS,
      team
    };
  },
  removeTeam(id) {
    return {
      type: ActionTypes.REMOVE_TEAM,
      id
    };
  },
  updateGame(game) {
    return {
      type: ActionTypes.UPDATE_GAME,
      game
    };
  },
  deleteGame() {
    return {
      type: ActionTypes.DELETE_GAME
    };
  }
};

export default GameActions;
