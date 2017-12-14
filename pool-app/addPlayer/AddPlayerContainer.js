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
  onAddPlayer({ gameId, id }) {
    props.addPlayerToGame({ variables: { gameId, userId: id } })
      .then((response) => {
        debugger;
      }).catch((err) => {
        debugger;
      });
  }
});

const ADD_PLAYER_TO_GAME = gql`
mutation AddPlayerToGame($userId: String! $gameId: String!) {
  addPlayerToGame(userId: $userId, gameId: $gameId) {
    gameId
  }
}
`;

const GET_ALL_PLAYERS = gql`
query GetPlayers {
  allUsers{
    id,
    email
  }
}
`;

const initialState = ({ allUsers }) => ({
  email: '',
  allUsers,
  filteredUsers: []
});

const handlers = {
  onUpdateName: () => name => ({ name }),
  onSearchEmail: (state, { getAllUsers }) => (searchEmail) => {
    const { allUsers } = getAllUsers;
    const lowerCaseEmail = searchEmail.toLowerCase();
    const filteredUsers = (allUsers || [])
      .filter(({ email }) => email.toLowerCase().includes(lowerCaseEmail));
    return {
      filteredUsers,
      email: searchEmail
    };
  }
};


export default _.flowRight(
  graphql(ADD_PLAYER_TO_GAME, { name: 'addPlayerToGame' }),
  graphql(GET_ALL_PLAYERS, { name: 'getAllUsers' }),
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(initialState, handlers),
)(AddPlayer);
