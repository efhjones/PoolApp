import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import App from './App';
import AppActions from './actions';
import { getToken } from '../utils/storageUtils';

const mapStateToProps = (state) => {
  const { app } = state;
  const {
    isErrored, errorMessage, id, token, isLoading
  } = app;
  return {
    isErrored,
    errorMessage,
    id,
    token,
    isLoading
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
    dispatch(AppActions.onMarkLoading());
    props.logInUser({ variables: { email, password } })
      .then(({ data }) => {
        const { authenticateUser } = data;
        const { id, token } = authenticateUser;
        dispatch(AppActions.onSetId(id));
        dispatch(AppActions.onSaveToken(token));
        dispatch(AppActions.onMarkLoadingDone());
      })
      .catch((error) => {
        dispatch(AppActions.onMarkLoadingDone());
        dispatch(AppActions.onSetErrors(error));
      });
  },
  onClearErrors() {
    dispatch(AppActions.onClearErrors());
  },
  onLogInWithId: async ({ id }) => {
    dispatch(AppActions.onSetId(id));
    const token = await getToken();
    dispatch(AppActions.onSaveToken(token));
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
  graphql(LOGIN_USER, { name: 'logInUser' }),
  graphql(LOGGED_IN_USER, { options: { fetchPolicy: 'network-only' } }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
