import { connect } from 'react-redux';
import App from './App';
import AppActions from './actions';

const mapStateToProps = state => ({
  text: state.app.text
});

const mapDispatchToProps = dispatch => ({
  onChangeText(text) {
    dispatch(AppActions.onChangeText(text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
