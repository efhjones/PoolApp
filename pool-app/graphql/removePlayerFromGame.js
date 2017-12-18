import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const REMOVE_PLAYER_FROM_GAME = gql`
  mutation removePlayerFromGame($userId: ID!, $gameId: ID!) {
    removeFromUserInGame(
      playersUserId: $userId,
      gamesGameId: $gameId
  ) {
    gamesGame {
      id,
      players {
        id,
        email
      }
    }
  }
  }
`;

export default graphql(REMOVE_PLAYER_FROM_GAME, {
  name: 'removePlayerFromGame'
});
