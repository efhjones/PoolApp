import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import AddNewGame from './AddNewGame';
import AppActions from '../app/actions';
import GameActions from './actions';

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
    props.createGame({ variables: { userId } })
      .then(({ data }) => {
        const { createNewGame } = data;
        const gameId = createNewGame.id;
        dispatch(GameActions.onEnterGameFlow(gameId));
        debugger;
        props.navigation();
      }).catch((error) => {
        dispatch(AppActions.onSetErrors(error));
      });
  }
});

const CREATE_GAME = gql`
  mutation CreateGame($userId: String!) {
    createNewGame(userId: $userId) {
      id
    }
  }
`;

export default _.flowRight(
  graphql(CREATE_GAME, { name: 'createGame' }),
  connect(mapStateToProps, mapDispatchToProps)
)(AddNewGame);
