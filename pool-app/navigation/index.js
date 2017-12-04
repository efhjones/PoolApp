import React from 'react';
import { StackNavigator } from 'react-navigation';
import AppContainer from '../app/AppContainer';
import NewGame from '../newGame/index';
import AddNewGame from '../newGame/AddNewGame';

export default StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: {
      headerTitle: 'Home',
      headerRight: <AddNewGame />
    }
  },
  NewGame: {
    screen: NewGame,
    navigationOptions: {
      headerTitle: 'New Game'
    }
  }
});
