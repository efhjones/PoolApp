import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  logOutButton: {
    display: 'flex'
  },
  newGameButton: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  }
});

const AddNewGameButton = ({ onCreateNewGame, id }) => (
  <Button
    style={styles.newGameButton}
    onPress={() => onCreateNewGame(id)}
    title="New Game"
  />
);

AddNewGameButton.propTypes = {
  onCreateNewGame: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};


const Home = ({ onLogOut, onCreateNewGame, id }) => (
  <View style={styles.container}>
    <AddNewGameButton onCreateNewGame={onCreateNewGame} id={id} />
    <Text style={styles.welcome}>
    Hi! I&apos;m the home page!
    </Text>
    <Button
      style={styles.logOutButton}
      onPress={onLogOut}
      title="Log out"
    />
  </View>
);

Home.propTypes = {
  onLogOut: PropTypes.func.isRequired,
  onCreateNewGame: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Home;
