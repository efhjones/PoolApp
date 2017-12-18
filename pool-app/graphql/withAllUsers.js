import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_ALL_PLAYERS = gql`
query GetPlayers {
  allUsers{
    id,
    email
  }
}
`;

export default graphql(GET_ALL_PLAYERS, { name: 'getAllUsers' });
