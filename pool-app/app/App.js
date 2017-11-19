import React from 'react';
import { withStateHandlers } from 'recompose';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';

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
  },
  signInButton: {
    display: 'flex'
  },
  createAccountButton: {
    display: 'flex'
  }
});

const App = ({
  onChangeUsername, onChangePassword, username, password, onSignUp
}) => (
  <View style={styles.container}>
    <Text>Sign in or create a new account below</Text>
    <TextInput
      onChangeText={text => onChangeUsername(text)}
      value={username}
      style={styles.field}
      placeholder="username"
    />
    <TextInput
      onChangeText={text => onChangePassword(text)}
      value={password}
      style={styles.field}
      placeholder="password"
    />
    <Button
      style={styles.createAccountButton}
      onPress={onSignUp}
      title="Create an Account"
    />
    <Button
      style={styles.signInButton}
      onPress={onSignUp}
      title="Sign In"
    />
  </View>
);

const initialState = {
  username: '',
  password: ''
};

const handlers = {
  onChangeUsername: () => username => ({
    username
  }),
  onChangePassword: () => password => ({
    password
  })
};

App.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  navigation: PropTypes.any,
  onSignUp: PropTypes.func.isRequired

};

export default withStateHandlers(initialState, handlers)(App);
