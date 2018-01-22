import { connect } from 'react-redux';
import _ from 'lodash';
import { branch, renderComponent, compose } from 'recompose';
import NewGame from './NewGame';
import AppActions from '../../app/actions';
import { getGameToken, deleteGameToken } from '../../utils/storageUtils';
import GameActions from '../actions';
import Loading from '../../loading/Loading';
import withGame from '../../graphql/withGame';
import withAllUsers from '../../graphql/withAllUsers';
import addPlayerToTeam from '../../graphql/addPlayerToTeam';
import removePlayerFromTeam from '../../graphql/removePlayerFromTeam';
import removeTeam from '../../graphql/removeTeam';
import addTeamToGame from '../../graphql/addTeamToGame';
import createGame from '../../graphql/createGame';

const mapStateToProps = (state) => {
  const { game, app } = state;
  const { id, teams } = game;
  return {
    gameId: id,
    teams,
    userId: app.id
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  createOrResumeGame(userId) {
    getGameToken().then((token) => {
      if (token) {
        dispatch(GameActions.onSetGameId(token));
      } else {
        props.createGame({ variables: { userId } }).then(({ data }) => {
          const { createNewGame } = data;
          const gameId = createNewGame.id;
          dispatch(GameActions.onSetGameId(gameId));
        })
          .catch((err) => {
            debugger;
            dispatch(AppActions.onSetErrors(err));
          });
      }
    });
  },
  onAddPlayer({ userId, teamId }) {
    props.addPlayerToTeam({ variables: { userId, teamId } })
      .then(({ data }) => {
        const { addToPlayerInTeam } = data;
        const team = _.get(addToPlayerInTeam, ['teamsTeam'], []);
        dispatch(GameActions.updateTeamPlayers(team));
      })
      .catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  onRemovePlayer({ teamId, userId }) {
    props.removePlayerFromTeam({ variables: { teamId, userId } })
      .then(({ data }) => {
        const team = _.get(data, ['removeFromPlayerInTeam', 'teamsTeam']);
        dispatch(GameActions.updateTeamPlayers(team));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  onRemoveTeam({ teamId }) {
    props.removeTeam({ variables: { teamId } })
      .then(({ data }) => {
        const id = _.get(data, ['deleteTeam', 'id']);
        dispatch(GameActions.removeTeam(id));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  onAddTeam(gameId) {
    props.addTeamToGame({ gameId })
      .then(({ data }) => {
        const game = _.get(data, ['createTeam', 'game']);
        dispatch(GameActions.updateGame(game));
      }).catch((err) => {
        dispatch(AppActions.onSetErrors(err));
      });
  },
  updateGame(game) {
    dispatch(GameActions.updateGame(game));
  },
  onDeleteGame() {
    deleteGameToken().then(() => {
      dispatch(GameActions.deleteGame());
    }).catch((err) => {
      dispatch(AppActions.onSetErrors(err));
    });
  }
});

export default compose(
  addPlayerToTeam,
  withAllUsers,
  removePlayerFromTeam,
  removeTeam,
  addTeamToGame,
  createGame,
  connect(mapStateToProps, mapDispatchToProps),
  withGame,
  branch(
    (props) => {
      const isGameLoading = _.get(props, ['getGame', 'loading'], false);
      return isGameLoading;
    },
    renderComponent(Loading)
  )
)(NewGame);
