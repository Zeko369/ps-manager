import { gql } from '@apollo/client';

export const ME = gql`
  query ME {
    me {
      id
      name
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

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;
