import { connect } from 'react-redux';
import _ from 'lodash';
import { withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddPlayer from './AddPlayer';


const mapStateToProps = (state) => {
  const { home } = state;
  const { gameId } = home;
  return {
    gameId
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onAddPlayer({ gameId, name }) {
    props.addPlayerToGame({ variables: { gameId, name } })
      .then((response) => {
        debugger;
      }).catch((err) => {
        debugger;
      });
  }
});

const ADD_PLAYER_TO_GAME = gql`
mutation AddPlayerToGame($gameId: String!, $name: String!, $email: String) {
  addToUserInGame(gamesGameId: $gameId, name: $name, email: $email) {
    id
  }
}
`;

const initialState = {
  name: ''
};

const handlers = {
  onUpdateName: () => name => ({ name })
};


export default _.flowRight(
  graphql(ADD_PLAYER_TO_GAME, { name: 'addPlayerToGame' }),
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(initialState, handlers),
)(AddPlayer);
