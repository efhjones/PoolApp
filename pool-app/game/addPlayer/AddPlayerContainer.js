import { connect } from 'react-redux';
import _ from 'lodash';
import { withStateHandlers, branch, renderComponent, lifecycle } from 'recompose';
import AddPlayer from './AddPlayer';
import GameActions from '../actions';
import AppActions from '../../app/actions';
import Loading from '../../loading/Loading';
import withPlayersInGame from '../../graphql/withPlayersInGame';
import withAllUsers from '../../graphql/withAllUsers';
import addPlayerToGame from '../../graphql/addPlayerToGame';
import removePlayerFromGame from '../../graphql/removePlayerFromGame';

const mapStateToProps = (state) => {
  const { game } = state;
  const { id, players } = game;
  return {
    gameId: id,
    players
  };
};
const pathToPlayers = ['gamesGame', 'players'];
const getPlayers = responseObj => _.get(responseObj, pathToPlayers, {});

const mapDispatchToProps = (dispatch, props) => ({
  onAddPlayer({ gameId, userId }) {
    props.addPlayerToGame({ variables: { gameId, userId } })
      .then(({ data }) => {
        const { addToUserInGame } = data;
        const players = getPlayers(addToUserInGame);
        dispatch(GameActions.updatePlayers(players));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  onRemovePlayer({ gameId, userId }) {
    props.removePlayerFromGame({ variables: { gameId, userId } })
      .then(({ data }) => {
        const { removeFromUserInGame } = data;
        const players = getPlayers(removeFromUserInGame);
        dispatch(GameActions.updatePlayers(players));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  seedStoreWithGameData(playersInGame) {
    const players = _.get(playersInGame, ['Game', 'players'], {});
    if (!_.isEmpty(players)) {
      dispatch(GameActions.updatePlayers(players));
    }
  }
});

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
  addPlayerToGame,
  withAllUsers,
  removePlayerFromGame,
  connect(mapStateToProps, mapDispatchToProps),
  withPlayersInGame,
  withStateHandlers(initialState, handlers),
  branch(
    (props) => {
      const { playersInGame } = props;
      return playersInGame && playersInGame.loading;
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
