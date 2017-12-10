import { StackNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGameContainer from '../newGame/NewGameContainer';

export default StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  NewGame: {
    screen: NewGameContainer,
    navigationOptions: {
      headerTitle: 'New Game'
    }
  }
});
