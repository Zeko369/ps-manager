import { gql } from '@apollo/client';

export const SUBSCRIPTION_TYPES = gql`
  query subscriptionTypes {
    subscriptionTypes {
      id
      slug
      name
      price
      subscriptionItems {
        id
        amount
        product {
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
