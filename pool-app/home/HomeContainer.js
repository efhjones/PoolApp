import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import Home from './Home';
import AppActions from '../app/actions';
import HomeActions from './actions';

const mapStateToProps = (state) => {
  const { app, home } = state;
  const { gameId } = home;
  const { id } = app;
  return {
    gameId,
    id
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onLogOut() {
    dispatch(AppActions.onLogOut());
  },
  onCreateNewGame(userId) {
    return props.createGame({ variables: { userId } })
      .then(({ data }) => {
        const { createNewGame } = data;
        const gameId = createNewGame.id;
        dispatch(HomeActions.onEnterGameFlow(gameId));
        debugger;
        props.navigation.navigate('NewGame');
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
)(Home);
