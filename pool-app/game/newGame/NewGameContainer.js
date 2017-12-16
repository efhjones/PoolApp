import { connect } from 'react-redux';
import _ from 'lodash';
import NewGame from './NewGame';

const mapStateToProps = (state) => {
  const { app, home } = state;
  const { gameId } = home;
  const {
    id
  } = app;
  return {
    navigation: state.nav,
    id,
    gameId
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onAddPlayer() {
    props.navigation.navigate('AddPlayer');
  }
});


export default _.flowRight(connect(mapStateToProps, mapDispatchToProps))(NewGame);
