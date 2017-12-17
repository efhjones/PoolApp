import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    paddingTop: 100
  },
  field: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    padding: 10
  },
  playersInGameContainer: {
    height: 100,
    backgroundColor: 'white',
    marginBottom: 20,
    width: '80%'
  }
});

// enter search field for user
// if no user found, add player button is shown
// enter user email/name and click add player
const AddPlayer = ({
  onAddPlayer, onSearchEmail, email, gameId, filteredUsers, playersInGame
}) => {
  const currentPlayersInGame = _.get(playersInGame, ['Game', 'players'], []);
  return (
    <View style={styles.container}>
      <View style={styles.playersInGameContainer}>
        {currentPlayersInGame.map(player => <Text key={player.email}>{player.email}</Text>)}
      </View>
      <TextInput
        onChangeText={onSearchEmail}
        value={email}
        style={styles.field}
        autoCapitalize="none"
        placeholder="Player Email"
      />
      {
      filteredUsers.map(user => (
        <Button
          key={user.email}
          style={styles.createAccountButton}
          onPress={() => onAddPlayer({ gameId, userId: user.id })}
          title={user.email}
        />
      ))
    }
    </View>
  );
};


AddPlayer.propTypes = {
  onAddPlayer: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  onSearchEmail: PropTypes.func.isRequired,
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  playersInGame: PropTypes.shape({
    Game: PropTypes.shape({
      players: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string.isRequired
      }))
    })
  })
};

AddPlayer.defaultProps = {
  playersInGame: []
};


export default AddPlayer;
