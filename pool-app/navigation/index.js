import { StackNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGame from '../newGame/index';

export default StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      headerTitle: 'Home',
      header: () => null
    }
  },
  NewGame: {
    screen: NewGame,
    navigationOptions: {
      headerTitle: 'New Game'
    }
  }
});
