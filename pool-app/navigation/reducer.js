import { NavigationActions } from 'react-navigation';
import Navigator from './navigator';

const initialState = Navigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;
