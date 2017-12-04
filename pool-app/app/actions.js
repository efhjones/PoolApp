import AsyncStorage from 'AsyncStorage';
import * as ActionTypes from './actionTypes';
import { STORAGE_AUTH_TOKEN } from '../utils/constants';

const AppActions = {
  onSetId(id) {
    return {
      type: ActionTypes.SET_AUTH_ID,
      id
    };
  },
  onSaveToken(token) {
    return dispatch => AsyncStorage.setItem(STORAGE_AUTH_TOKEN, token, (err) => {
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
    return dispatch => AsyncStorage.removeItem(STORAGE_AUTH_TOKEN, (err) => {
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
  },
  onMarkLoading() {
    return {
      type: ActionTypes.ON_MARK_LOADING
    };
  },
  onMarkLoadingDone() {
    return {
      type: ActionTypes.ON_MARK_LOADING_DONE
    };
  }
};

export default AppActions;
