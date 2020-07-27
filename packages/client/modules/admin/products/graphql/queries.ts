import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query PRODUCTS {
    products {
      id
      name
      price
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query PRODUCT($id: Int!) {
    product(id: $id) {
      id
      name
      price
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

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: Int!, $data: UpdateProductInput!) {
    updateProduct(id: $id, data: $data) {
      id
      name
      price
    }
  }
`;
