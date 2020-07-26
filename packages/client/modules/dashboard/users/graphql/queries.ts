import { gql } from '@apollo/client';

export const USERS = gql`
  query USERS {
    users {
      id
      name
      email
      role
    }
  }
`;
