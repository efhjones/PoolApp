import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PLAYERS_IN_GAME = gql`
query PlayersInGame ($id: ID!){
  Game(id: $id) {
    players {
      email,
      id
    }
  }
}
`;

export default graphql(PLAYERS_IN_GAME, {
  options: ({ gameId }) => ({ variables: { id: gameId } }),
  skip: ({ gameId }) => !gameId,
  name: 'playersInGame'
});
