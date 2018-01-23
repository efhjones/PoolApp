import { connect } from 'react-redux';
import Home from './Home';
import AppActions from '../app/actions';
import GameActions from '../game/actions';

const mapStateToProps = (state) => {
  const { app, game } = state;
  const { id } = app;
  return {
    gameId: game.id,
    id
  };
};

const mapDispatchToProps = dispatch => ({
  onLogOut() {
    dispatch(GameActions.deleteGame());
    dispatch(AppActions.onLogOut());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
