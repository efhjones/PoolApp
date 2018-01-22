import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const ADD_TEAM_TO_GAME = gql`
  mutation addTeamToGame($gameId:ID!){
    createTeam(
      gameId: $gameId,
    ) {
      game {
        id,
        teams {
          id,
          players {
            id,
            email
          }
        }
      }
    }
  }
`;

export default graphql(ADD_TEAM_TO_GAME, { name: 'addTeamToGame' });
