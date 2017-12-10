import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import PropTypes from 'prop-types';


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

const NewGame = ({ onAddPlayer }) => (
  <View style={styles.container}>
    <View style={styles.newGameHeaderContainer}>
      <Text style={styles.newGameHeader}>Start a New Game</Text>
    </View>
    <Button
      title="Add a player"
      onPress={onAddPlayer}
      style={styles.addPlayerButton}
    />
  </View>
);


export default NewGame;
