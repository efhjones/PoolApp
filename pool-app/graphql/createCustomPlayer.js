import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_CUSTOM_PLAYER = gql`
  mutation CreateCustomUser($email: String!) {
    createUser(email: $email) {
      id
    }
  }
`;


export default graphql(CREATE_CUSTOM_PLAYER, { name: 'createCustomPlayer' });
