import { connect } from 'react-redux';
import App from './App.js';
import AppActions from './actions';

const mapStateToProps = (state) => {
  return {
    text: state.app.text
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText(text) {
      dispatch(AppActions.onChangeText(text))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
