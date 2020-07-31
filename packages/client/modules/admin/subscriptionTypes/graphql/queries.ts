import { gql } from '@apollo/client';

export const SUBSCRIPTION_TYPES = gql`
  query subscriptionTypes {
    subscriptionTypes {
      id
      amount
      slug
      name
      price
      subscriptionItems {
        id
        products {
          id
          name
          price
        }
      }
    }
  }
`;

export const SUBSCRIPTION_TYPE = gql`
  query subscriptionType($id: Int!) {
    subscriptionType(id: $id) {
      id
      amount
      slug
      name
      price
      subscriptionItems {
        id
        products {
          id
          name
          price
        }
      }
    }
  }
`;

export const CREATE_SUBSCRIPTION_TYPE = gql`
  mutation createSubscriptionType($name: String, $slug: String!) {
    createSubscriptionType(data: { name: $name, slug: $slug }) {
      id
      name
      slug
    }
  }
`;

export const UPDATE_SUBSCRIPTION_TYPE = gql`
  mutation updateSubscriptionType($id: Int!, $data: UpdateSubscriptionTypeInput!) {
    updateSubscriptionType(id: $id, data: $data) {
      id
      name
      slug
    }
  }
`;
