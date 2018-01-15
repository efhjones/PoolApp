import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CREATE_GAME = gql`
  mutation CreateGame($userId: String!) {
    createNewGame(userId: $userId) {
      id
    }
  }
`;

export default graphql(CREATE_GAME, { name: 'createGame' });
