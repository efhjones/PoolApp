import { connect } from 'react-redux';
import { branch, compose, renderComponent } from 'recompose';
import ActiveGameContainer from './activeGame/ActiveGameContainer';
import withGame from '../graphql/withGame';
import createGame from '../graphql/createGame';
import AppActions from '../app/actions';
import { getGameToken } from '../utils/storageUtils';
import GameActions from './actions';
import Game from './Game';


const mapStateToProps = (state) => {
  const { game } = state;
  const gameId = game.id;
  const isGameInProgress = game.inProgress;
  debugger;
  return {
    gameId,
    isGameInProgress
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  createOrResumeGame() {
    getGameToken().then((token) => {
      if (token) {
        dispatch(GameActions.onSetGameId(token));
      } else {
        props.createGame().then(({ createNewGame }) => {
          const gameId = createNewGame.id;
          dispatch(GameActions.onSetGameId(gameId));
        })
          .catch((err) => {
            debugger;
            dispatch(AppActions.onSetErrors(err));
          });
      }
    });
  }
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withGame,
  createGame,
  branch(
    (props) => {
      debugger;
      return props.gameInProgress;
    },
    renderComponent(ActiveGameContainer)
  )
)(Game);
