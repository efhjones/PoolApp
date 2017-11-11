import createReducer from '../utils/createReducer.js';
import * as ActionTypes from './actionTypes.js';

const initialState = {
  text: 'Yo I\'m the default state text!'
};

const appReducer = createReducer(initialState, {
  [ActionTypes.CHANGE_TEXT](state, action) {
    return {
      ...state,
      text: action.text
    };
  },
});

export default appReducer;
