import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const REMOVE_TEAM = gql`
  mutation removeTeamFromGame($teamId: ID!) {
    deleteTeam(
      id: $teamId
  ) {
      id
    }
  }
`;

export default graphql(REMOVE_TEAM, {
  name: 'removeTeam'
});
