import { gql } from '@apollo/client';

export const QUERY = gql`
  query Main {
    products {
      id
      name
    }
  }
`;
