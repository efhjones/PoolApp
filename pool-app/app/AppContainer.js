import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import App from './App';
import AppActions from './actions';

const mapStateToProps = (state) => {
  const { app } = state;
  const { isErrored, errorMessage } = app;
  return {
    isErrored,
    errorMessage,
    text: state.app.text
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


export default _.flowRight(
  graphql(SIGNUP_EMAIL_USER, { name: 'signUpUser' }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);
