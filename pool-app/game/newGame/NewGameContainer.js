import { connect } from 'react-redux';
import _ from 'lodash';
import NewGame from './NewGame';
import createGame from '../../graphql/createGame';

const mapStateToProps = (state) => {
  const { app, game } = state;
  const { gameId } = game;
  const {
    id
  } = app;
  const isNewGame = !gameId;
  return {
    navigation: state.nav,
    id,
    gameId,
    isNewGame
  };
};

export default _.flowRight(
  createGame,
  connect(mapStateToProps)
)(NewGame);
