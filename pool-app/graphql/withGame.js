import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_GAME = gql`
query GetGame ($id: ID!){
  Game(id: $id) {
    inProgress,
    players {
      id,
      email
    },
    innings {
      id
    }
  }
}
`;

export default graphql(GET_GAME, {
  options: ({ gameId }) => ({ variables: { id: gameId } }),
  skip: ({ gameId }) => !gameId,
  name: 'getGame'
});
