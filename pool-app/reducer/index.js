
import { combineReducers } from 'redux';
import appReducer from '../app/reducer.js';


export default combineReducers({
  app: appReducer
});
