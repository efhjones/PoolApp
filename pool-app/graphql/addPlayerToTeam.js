import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const ADD_PLAYER_TO_TEAM = gql`
  mutation addPlayerToTeam($userId:ID!, $teamId: ID!){
    addToPlayerInTeam(
      playersUserId: $userId,
      teamsTeamId: $teamId
    ) {
      teamsTeam {
        id,
        players {
          id,
          email
        }
      }
    }
  }
`;

export default graphql(ADD_PLAYER_TO_TEAM, { name: 'addPlayerToTeam' });
