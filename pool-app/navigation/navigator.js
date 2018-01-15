import { TabNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGameContainer from '../game/newGame/NewGameContainer';
import StatsContainer from '../stats/StatsContainer';
import { MIDNIGHT_BLUE } from '../styles/constants';

export default TabNavigator({
  Home: {
    screen: AppContainer
  },
  Stats: {
    screen: StatsContainer
  },
  Game: {
    screen: NewGameContainer
  }
}, {
  tabBarOptions: {
    activeTintColor: MIDNIGHT_BLUE,
    showLabel: true,
    showIcon: true,
    labelStyle: {
      fontSize: 20
    }
  }
});
