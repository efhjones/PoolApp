
import { combineReducers } from 'redux';
import appReducer from '../app/reducer';
// import navReducer from '../navigation/index';

export default combineReducers({
  app: appReducer
});
