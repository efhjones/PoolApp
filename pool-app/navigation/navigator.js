import { TabNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import StatsContainer from '../stats/StatsContainer';
import GameContainer from '../game/GameContainer';
import { MIDNIGHT_BLUE } from '../styles/constants';

export default TabNavigator({
  Home: {
    screen: AppContainer
  },
  Stats: {
    screen: StatsContainer
  },
  Game: {
    screen: GameContainer
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
