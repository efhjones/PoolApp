import React from 'react';
import {
  Button
} from 'react-native';
import PropTypes from 'prop-types';

const AddNewGame = ({ id, onCreateGame }) => (
  <Button
    title="Add a game!"
    onPress={() => onCreateGame(id)}
  />
);

AddNewGame.propTypes = {
  id: PropTypes.string.isRequired,
  onCreateGame: PropTypes.func.isRequired
};

export default AddNewGame;
