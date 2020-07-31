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
