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

// enter search field for user
// if no user found, add player button is shown
// enter user email/name and click add player
const AddPlayer = ({
  onAddPlayer, onSearchEmail, email, gameId, filteredUsers
}) => (
  <View style={styles.container}>
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
          onPress={() => onAddPlayer({ gameId, id: user.id })}
          title={user.email}
        />
      ))
    }
  </View>
);

AddPlayer.propTypes = {
  onAddPlayer: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  onSearchEmail: PropTypes.func.isRequired,
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default AddPlayer;
