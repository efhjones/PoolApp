
import { combineReducers } from 'redux';
import appReducer from '../app/reducer';
import navReducer from '../navigation/reducer';

export default combineReducers({
  app: appReducer,
  nav: navReducer
});
