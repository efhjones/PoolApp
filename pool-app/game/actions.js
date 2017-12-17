import * as ActionTypes from './actionTypes';

const GameActions = {
  onSetGameId(id) {
    return {
      type: ActionTypes.ON_SET_GAME_ID,
      id
    };
  },
  onAddPlayerToGame(playerId) {
    return {
      type: ActionTypes.ON_ADD_PLAYER,
      playerId
    };
  }
};

export default GameActions;
