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

export const USER = gql`
  query USER($id: Int!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      role
    }
  }
`;
