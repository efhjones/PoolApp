import * as ActionTypes from './actionTypes';

const GameActions = {
  onSetGameId(id) {
    return {
      type: ActionTypes.ON_SET_GAME_ID,
      id
    };
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
  }
};

export default GameActions;
