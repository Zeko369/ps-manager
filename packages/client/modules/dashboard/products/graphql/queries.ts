import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query PRODUCTS {
    products {
      id
      name
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $price: Float!) {
    createProduct(data: { name: $name, price: $price }) {
      id
      name
      price
    }
  }
`;
