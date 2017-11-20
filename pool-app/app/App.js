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
import Error from '../error/Error';

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
  onChangeEmail,
  onChangePassword,
  email,
  password,
  onSignUp,
  isErrored,
  errorMessage,
  onClearErrors
}) => (
  <View style={styles.container}>
    <Text>Sign in or create a new account below</Text>
    <TextInput
      onChangeText={newEmail => onChangeEmail(newEmail)}
      onFocus={onClearErrors}
      value={email}
      style={styles.field}
      placeholder="email"
      keyboardType="email-address"
    />
    <TextInput
      onChangeText={newPassword => onChangePassword(newPassword)}
      onFocus={onClearErrors}
      value={password}
      style={styles.field}
      placeholder="password"
    />
    {
        isErrored
        ? <Error error={errorMessage} />
        : null
      }
    <Button
      style={styles.createAccountButton}
      onPress={() => onSignUp(email, password)}
      title="Create an Account"
    />
    <Button
      style={styles.signInButton}
      title="Sign In"
      onPress={() => null}
    />
  </View>
);

const initialState = {
  email: '',
  password: ''
};

const handlers = {
  onChangeEmail: () => email => ({
    email
  }),
  onChangePassword: () => password => ({
    password
  })
};


App.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isErrored: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onClearErrors: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default withStateHandlers(initialState, handlers)(App);
