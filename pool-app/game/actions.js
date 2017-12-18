import * as ActionTypes from './actionTypes';

const GameActions = {
  onSetGameId(id) {
    return {
      type: ActionTypes.ON_SET_GAME_ID,
      id
    };
  },
  updatePlayers(players) {
    return {
      type: ActionTypes.UPDATE_PLAYERS,
      players
    };
  }
};

export default GameActions;
