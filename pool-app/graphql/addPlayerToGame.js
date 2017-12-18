import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const ADD_PLAYER_TO_GAME = gql`
  mutation addUserToGame($userId:ID!, $gameId:ID!){
    addToUserInGame(
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

export default graphql(ADD_PLAYER_TO_GAME, { name: 'addPlayerToGame' });
