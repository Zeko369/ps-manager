import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query PRODUCTS {
    products {
      id
      name
    }
  }
`;
