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
        name
        subscriptionItemProducts {
          amount
          product {
            id
            name
            price
          }
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
        name
        subscriptionItemProducts {
          amount
          product {
            id
            name
            price
          }
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

export const CREATE_SUBSCRIPTION_ITEM = gql`
  mutation createSubscriptionItem(
    $name: String!
    $productIds: [Int!]!
    $amounts: [Int!]!
    $subscriptionTypeId: Int!
  ) {
    createSubscriptionItem(
      data: {
        name: $name
        productIds: $productIds
        amounts: $amounts
        subscriptionTypeId: $subscriptionTypeId
      }
    ) {
      id
    }
  }
`;

export const SUBSCRIPTION_ITEM = gql`
  query subscriptionItem($id: Int!) {
    subscriptionItem(id: $id) {
      id
      name
      subscriptionItemProducts {
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
