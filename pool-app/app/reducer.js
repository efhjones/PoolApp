import _ from 'lodash';
import createReducer from '../utils/createReducer';
import * as ActionTypes from './actionTypes';

const initialState = {
  id: null,
  isErrored: false,
  errorMessage: null
};

const appReducer = createReducer(initialState, {
  [ActionTypes.SET_AUTH_ID](state, { id }) {
    return {
      ...state,
      id
    };
  },
  [ActionTypes.ON_SAVE_TOKEN](state, { token }) {
    return {
      ...state,
      token
    };
  },
  [ActionTypes.ON_SET_ERRORS](state, action) {
    const errorMessage = _.get(
      action,
      ['errors', 'graphQLErrors', 0, 'functionError'],
      'There was an error'
    );
    return {
      ...state,
      isErrored: true,
      errorMessage
    };
  },
  [ActionTypes.CLEAR_ERRORS](state) {
    return {
      ...state,
      isErrored: false,
      errorMessage: null
    };
  }
});


export default appReducer;
