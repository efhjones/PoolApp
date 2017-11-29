import { connect } from 'react-redux';
import Home from './Home';
import AppActions from '../app/actions';

const mapDispatchToProps = dispatch => ({
  onLogOut() {
    dispatch(AppActions.onLogOut());
  }
});

export default connect(null, mapDispatchToProps)(Home);
