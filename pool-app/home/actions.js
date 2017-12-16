import * as ActionTypes from './actionTypes';
import { saveGameToken } from '../utils/storageUtils';

const AppActions = {
  onEnterGameFlow(gameId) {
    saveGameToken(gameId);
    return (dispatch) => {
      dispatch({
        type: ActionTypes.ON_ENTER_GAME_FLOW
      });
    };
  }
};

export default AppActions;
