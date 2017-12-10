import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import gql from 'graphql-tag';
import NewGame from './NewGame';

const mapStateToProps = (state) => {
  const { app } = state;
  const {
    id
  } = app;
  return {
    navigation: state.nav,
    id
  };
};

const mapDispatchToProps = (dispatch, props) => ({
});


export default _.flowRight(connect(mapStateToProps, mapDispatchToProps))(NewGame);
