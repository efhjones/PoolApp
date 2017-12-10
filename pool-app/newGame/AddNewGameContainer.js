import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import AddNewGame from './AddNewGame';

const mapStateToProps = (state) => {
  const { app } = state;
  const {
    id
  } = app;
  return {
    id
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onCreateGame(userId) {
    props.createGame(userId)
      .then((response) => {
        debugger;
      }).catch((error) => {
        debugger;
      });
  }
});

const CREATE_GAME = gql`
  mutation createGame($id: String!) {
    createGame(userId: $id) {
      id
    }
  }
`;

export default _.flowRight(
  graphql(CREATE_GAME, { name: 'createGame' }),
  connect(mapStateToProps, mapDispatchToProps)
)(AddNewGame);
