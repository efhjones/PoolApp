
import { combineReducers } from 'redux';
import appReducer from '../app/reducer';
import navReducer from '../navigation/reducer';
import gameReducer from '../newGame/reducer';

export default combineReducers({
  app: appReducer,
  nav: navReducer,
  game: gameReducer
});
