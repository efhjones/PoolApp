import * as ActionTypes from './actionTypes';

const AppActions = {
  onChangeText(text) {
    return {
      type: ActionTypes.CHANGE_TEXT,
      text
    }
  }
};

export default AppActions;
