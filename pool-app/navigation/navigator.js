import { StackNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGameContainer from '../newGame/NewGameContainer';
import AddPlayerContainer from '../addPlayer/AddPlayerContainer';

export default StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      header: () => null
    }
  },
  NewGame: {
    screen: NewGameContainer,
    navigationOptions: {
      header: () => null
    }
  },
  AddPlayer: {
    screen: AddPlayerContainer,
    navigationOptions: {
      header: () => null
    }
  }
});
