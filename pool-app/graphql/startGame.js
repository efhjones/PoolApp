import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const START_GAME = gql`
mutation startGame($gameId: ID!) {
  updateGame(
    id: $gameId,
    inProgress: true
  ) {
    id
  }
}
`;

export default graphql(START_GAME, {
  name: 'startGame'
});

