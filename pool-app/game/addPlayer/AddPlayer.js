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
    width: '80%'
  },
  searchHeader: {

  },
  playersHeader: {
    fontSize: 20
  },
  playerInGame: {
    color: '#E8E9EB',
    backgroundColor: '#202B4C',
    alignSelf: 'flex-start',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '600'
  },
  userBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// enter search field for user
// if no user found, add player button is shown
// enter user email/name and click add player
const AddPlayer = ({
  onAddPlayer,
  onSearchEmail,
  email,
  gameId,
  filteredUsers,
  onRemovePlayer,
  players
}) => {
  const currentPlayers = _.values(players);
  return (
    <View style={styles.container}>
      <Text style={styles.searchHeader}>Search for player by email</Text>
      <TextInput
        onChangeText={onSearchEmail}
        value={email}
        style={styles.field}
        autoCapitalize="none"
        placeholder="Player Email"
      />
      <View style={styles.playersInGameContainer}>
        <Text style={styles.playersHeader}>Players in this game:</Text>
        {currentPlayers.map(player => (
          <View key={player.email} style={styles.userBar}>
            <Button
              onPress={() => onRemovePlayer({ gameId, userId: player.id })}
              title="X"
              color="red"
            />
            <Text style={styles.playerInGame}>{player.email}</Text>
          </View>
          ))}
      </View>
      {
        filteredUsers.map(user => (
          <Button
            key={user.email}
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
  onRemovePlayer: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  onSearchEmail: PropTypes.func.isRequired,
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  players: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};


export default AddPlayer;
