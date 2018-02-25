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
import { MIDNIGHT_BLUE, PLATINUM, PARADISE_PINK } from '../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MIDNIGHT_BLUE
  },
  field: {
    height: 40,
    borderColor: PLATINUM,
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    padding: 10,
    color: PLATINUM,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  signInButton: {
    display: 'flex'
  },
  createAccountButton: {
    display: 'flex',
    backgroundColor: PLATINUM
  },
  createAccountButtonContainer: {
    display: 'flex',
    backgroundColor: PARADISE_PINK
  },
  signInButtonContainer: {
    backgroundColor: PLATINUM,
    display: 'flex',
    borderRadius: 300
  },
  buttonRow: {
    flexDirection: 'column',
    display: 'flex',
    width: 200
  },
  or: {
    color: PLATINUM,
    textAlign: 'center',
    fontWeight: '600',
    padding: 10
  },
  header: {
    fontSize: 50,
    color: PLATINUM,
    paddingTop: 20,
    paddingBottom: 20
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
    <Text style={styles.header}>Poolie</Text>
    <TextInput
      onChangeText={onChangeEmail}
      onFocus={onClearErrors}
      value={email}
      style={styles.field}
      placeholderTextColor={PLATINUM}
      autoCapitalize="none"
      placeholder="email"
      keyboardType="email-address"
    />
    <TextInput
      onChangeText={onChangePassword}
      placeholderTextColor={PLATINUM}
      onFocus={onClearErrors}
      value={password}
      style={styles.field}
      placeholder="password"
      color={PLATINUM}
    />
    {
      isErrored
      ? <Error error={errorMessage} />
      : null
    }
    <View style={styles.buttonRow}>
      <View style={styles.signInButtonContainer}>
        <Button
          style={styles.signInButton}
          title="Sign In"
          color={MIDNIGHT_BLUE}
          onPress={() => onLogIn(email, password)}
        />
      </View>
      <Text style={styles.or}>- OR -</Text>
      <View style={styles.createAccountButtonContainer}>
        <Button
          style={styles.createAccountButton}
          onPress={() => onSignUp(email, password)}
          title="Create an Account"
          color={PLATINUM}
        />
      </View>
    </View>
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
    isLoggedIn
      ? <HomeContainer navigation={props.navigation} />
      : <LoggedOutView {...props} />
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
