import { connect } from 'react-redux';
import _ from 'lodash';
import { branch, renderComponent } from 'recompose';
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

const mapStateToProps = (state) => {
  const { game } = state;
  const { id, teams } = game;
  return {
    gameId: id,
    teams
  };
};

const mapDispatchToProps = (dispatch, props) => ({
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

export default _.flowRight(
  addPlayerToTeam,
  withAllUsers,
  removePlayerFromTeam,
  removeTeam,
  addTeamToGame,
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
