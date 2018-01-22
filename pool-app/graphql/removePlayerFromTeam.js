import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const REMOVE_PLAYER_FROM_TEAM = gql`
  mutation removePlayerFromTeam($userId: ID!, $teamId: ID!) {
    removeFromPlayerInTeam(
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

export default graphql(REMOVE_PLAYER_FROM_TEAM, {
  name: 'removePlayerFromTeam'
});
