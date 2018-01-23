import { connect } from 'react-redux';
import { branch, compose, renderComponent } from 'recompose';
import withGame from '../graphql/withGame';
import Game from './Game';
import Loading from '../loading/Loading';

const mapStateToProps = (state) => {
  const { game } = state;
  const { app } = state;
  const userId = app.id;
  const gameId = game.id;
  const isGameInProgress = game.inProgress;
  return {
    gameId,
    userId,
    isGameInProgress
  };
};

export default compose(
  withGame,
  connect(mapStateToProps),
  branch(
    props => props.loading,
    renderComponent(Loading)
  )
)(Game);
