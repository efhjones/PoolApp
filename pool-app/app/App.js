import React from 'react';
import _ from 'lodash';
import { withStateHandlers, lifecycle, branch, renderComponent, compose } from 'recompose';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import Error from '../error/Error';
import HomeContainer from '../home/HomeContainer';
import Loading from '../loading/Loading';

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

const LoggedOutView = ({
  onChangeEmail,
  onChangePassword,
  email,
  password,
  onSignUp,
  isErrored,
  errorMessage,
  onClearErrors,
  onLogIn
}) => (
  <View style={styles.container}>
    <Text>Sign in or create a new account below</Text>
    <TextInput
      onChangeText={newEmail => onChangeEmail(newEmail)}
      onFocus={onClearErrors}
      value={email}
      style={styles.field}
      autoCapitalize="none"
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
      onPress={() => onLogIn(email, password)}
    />
  </View>
);

LoggedOutView.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  isErrored: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onClearErrors: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onLogIn: PropTypes.func.isRequired
};

LoggedOutView.defaultProps = {
  errorMessage: ''
};

const App = (props) => {
  const isLoggedIn = props.id;
  return (
    isLoggedIn ? <HomeContainer navigation={props.navigation} fuck="whatthefuck" /> : <LoggedOutView {...props} />
  );
};

App.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired,
  id: PropTypes.string,
  navigation: PropTypes.object.isRequired
};

App.defaultProps = {
  id: null
};

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

const AppWithLifecycle = lifecycle({
  componentWillMount() {
    const id = _.get(this.props.data, ['loggedInUser', 'id']);
    if (id) {
      this.props.navigation.setParams({ isLoggedIn: true });
      this.props.onLogInWithId({ id });
    } else {
      this.props.navigation.setParams({ isLoggedIn: false });
    }
  }
})(App);

export default compose(
  withStateHandlers(initialState, handlers),
  branch(
    props => (props.data && props.data.loading) || props.isLoading,
    renderComponent(Loading),
    renderComponent(AppWithLifecycle)
  )
)(App);
