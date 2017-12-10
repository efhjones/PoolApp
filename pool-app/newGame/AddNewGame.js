import React from 'react';
import {
  StyleSheet,
  Button,
  View
} from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

const AddNewGame = ({ id, onCreateGame }) => (
  <View style={styles.container}>
    <Button
      style={styles.addGameButton}
      title="New Game"
      onPress={() => onCreateGame(id)}
    />
  </View>
);

AddNewGame.propTypes = {
  id: PropTypes.string.isRequired,
  onCreateGame: PropTypes.func.isRequired
};

export default AddNewGame;
