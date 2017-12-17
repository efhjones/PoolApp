import { connect } from 'react-redux';
import _ from 'lodash';
import { withStateHandlers, branch, renderComponent, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddPlayer from './AddPlayer';
import GameActions from '../actions';
import AppActions from '../../app/actions';
import Loading from '../../loading/Loading';

const mapStateToProps = (state) => {
  const { game } = state;
  const { id, players } = game;
  return {
    gameId: id,
    players
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onAddPlayer({ gameId, userId }) {
    props.addPlayerToGame({ variables: { gameId, userId } })
      .then(() => {
        dispatch(GameActions.onAddPlayerToGame(userId));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  seedStoreWithGameData(playersInGame) {
    const { Game } = playersInGame;
    const { players } = Game;
    dispatch(GameActions.seedStorePlayers(players));
  }
});

const ADD_PLAYER_TO_GAME = gql`
mutation AddPlayerToGame($userId: String! $gameId: String!) {
  addPlayerToGame(userId: $userId, gameId: $gameId) {
    gameId
  }
}
`;

const GET_ALL_PLAYERS = gql`
query GetPlayers {
  allUsers{
    id,
    email
  }
}
`;

const PLAYERS_IN_GAME = gql`
query PlayersInGame ($id: ID!){
  Game(id: $id) {
    players {
      email,
      id
    }
  }
}
`;

const initialState = {
  email: '',
  filteredUsers: []
};

const handlers = {
  onUpdateName: () => name => ({ name }),
  onSearchEmail: (state, { getAllUsers }) => (searchEmail) => {
    const { allUsers } = getAllUsers;
    const lowerCaseEmail = searchEmail.toLowerCase();
    const filteredUsers = (allUsers || [])
      .filter(({ email }) => email.toLowerCase().includes(lowerCaseEmail));
    return {
      filteredUsers,
      email: searchEmail
    };
  }
};

export default _.flowRight(
  graphql(ADD_PLAYER_TO_GAME, { name: 'addPlayerToGame' }),
  graphql(GET_ALL_PLAYERS, { name: 'getAllUsers' }),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(PLAYERS_IN_GAME, {
    options: ({ gameId }) => ({ variables: { id: gameId } }),
    name: 'playersInGame'
  }),
  withStateHandlers(initialState, handlers),
  branch(
    (props) => {
      const { playersInGame } = props;
      return playersInGame.loading;
    },
    renderComponent(Loading)
  ),
  lifecycle({
    componentWillMount() {
      const { playersInGame } = this.props;
      this.props.seedStoreWithGameData(playersInGame);
    }
  })
)(AddPlayer);
