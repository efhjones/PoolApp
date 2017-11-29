import AsyncStorage from 'AsyncStorage';
import * as ActionTypes from './actionTypes';

const AppActions = {
  onSetId(id) {
    return {
      type: ActionTypes.SET_AUTH_ID,
      id
    };
  },
  onSaveToken(token) {
    return dispatch => AsyncStorage.setItem('UserAuthToken', token, (err) => {
      if (err) {
        return dispatch(AppActions.onSetErrors(err));
      }
      return dispatch({
        type: ActionTypes.ON_SAVE_TOKEN,
        token
      });
    });
  },
  onLogOut() {
    return dispatch => AsyncStorage.removeItem('UserAuthToken', (err) => {
      debugger;
      if (err) {
        return dispatch(AppActions.onSetErrors(err));
      }
      return dispatch({
        type: ActionTypes.ON_LOG_OUT
      });
    });
  },
  onSetErrors(errors) {
    return {
      type: ActionTypes.ON_SET_ERRORS,
      errors
    };
  },
  onClearErrors() {
    return {
      type: ActionTypes.CLEAR_ERRORS
    };
  }
};

export default AppActions;
