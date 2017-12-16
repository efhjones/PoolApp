
import { combineReducers } from 'redux';
import appReducer from '../app/reducer';
import navReducer from '../navigation/reducer';
import homeReducer from '../home/reducer';
import gameReducer from '../game/reducer';

export default combineReducers({
  app: appReducer,
  nav: navReducer,
  home: homeReducer,
  game: gameReducer
});
