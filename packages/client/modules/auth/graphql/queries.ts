import { gql } from '@apollo/client';

export const ME = gql`
  query ME {
    me {
      id
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`;
