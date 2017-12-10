import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  field: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    padding: 10
  }
});

const AddPlayer = ({
  onAddPlayer, onUpdateName, name, gameId
}) => (
  <View style={styles.container}>
    <TextInput
      onChangeText={onUpdateName}
      value={name}
      style={styles.field}
      autoCapitalize="none"
      placeholder="Player Name"
    />
    <Button
      style={styles.createAccountButton}
      onPress={() => onAddPlayer({ gameId, name })}
      title="Add Player to Game"
    />
  </View>
);

AddPlayer.propTypes = {
  onAddPlayer: PropTypes.func.isRequired,
  onUpdateName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired
};


export default AddPlayer;
