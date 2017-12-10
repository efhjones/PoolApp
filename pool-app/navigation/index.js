import React from 'react';
import _ from 'lodash';
import { StackNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGame from '../newGame/index';
import AddNewGameContainer from '../newGame/AddNewGameContainer';

export default StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      headerTitle: 'Home',
      header: (props) => {
        const isLoggedIn = _.get(props, ['scene', 'route', 'params', 'isLoggedIn'], false);
        return isLoggedIn ? <AddNewGameContainer /> : null;
      },
      headerRight: <AddNewGameContainer />
    }
  },
  NewGame: {
    screen: NewGame,
    navigationOptions: {
      headerTitle: 'New Game'
    }
  }
});
