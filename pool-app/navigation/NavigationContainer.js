import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Navigator from './index';

const Navigation = ({ dispatch, nav }) => (
  <Navigator navigation={addNavigationHelpers({
    dispatch,
    state: nav
  })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(Navigation);
