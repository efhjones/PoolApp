import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import AddPlayerContainer from '../addPlayer/AddPlayerContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  newGameHeaderContainer: {
    display: 'flex',
    height: 70,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newGameHeader: {
    color: 'darkgray',
    fontSize: 20,
    fontWeight: '600'
  },
  addPlayerButton: {}

});

const NewGame = () => (
  <View style={styles.container}>
    <AddPlayerContainer />
  </View>
);

NewGame.propTypes = {
};


export default NewGame;
