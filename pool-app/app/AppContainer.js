import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import App from './App';
import AppActions from './actions';

const mapStateToProps = (state) => {
  const { app } = state;
  const {
    isErrored, errorMessage, id, token
  } = app;
  return {
    isErrored,
    errorMessage,
    id,
    token
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onSignUp(email, password) {
    props.signUpUser({ variables: { email, password } })
      .then(({ data }) => {
        const { signupUser } = data;
        const { id, token } = signupUser;
        dispatch(AppActions.onSetId(id));
        dispatch(AppActions.onSaveToken(token));
      }).catch((error) => {
        dispatch(AppActions.onSetErrors(error));
      });
  },
  onLogIn(email, password) {
    props.LogInUser({ variables: { email, password } })
      .then(({ data }) => {
        const { authenticateUser } = data;
        const { id, token } = authenticateUser;
        dispatch(AppActions.onSetId(id));
        dispatch(AppActions.onSaveToken(token));
      })
      .catch((error) => {
        dispatch(AppActions.onSetErrors(error));
      });
  },
  onChangeText(text) {
    dispatch(AppActions.onChangeText(text));
  },
  onClearErrors() {
    dispatch(AppActions.onClearErrors());
  }
});

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

const LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
    }
  }
`;

export default _.flowRight(
  graphql(SIGNUP_EMAIL_USER, { name: 'signUpUser' }),
  graphql(LOGIN_USER, { name: 'LogInUser' }),
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only' } }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
