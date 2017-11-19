import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  text: 'Yo I\'m the default state text!'
};

const appReducer = createReducer(initialState, {
  [ActionTypes.CHANGE_TEXT](state, action) {
    return {
      ...state,
      text: action.text
    };
  }
});

export default appReducer;
