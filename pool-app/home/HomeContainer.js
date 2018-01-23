import { connect } from 'react-redux';
import Home from './Home';
import AppActions from '../app/actions';

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
    dispatch(AppActions.onLogOut());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
