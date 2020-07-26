import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user: User;
  products: Array<Product>;
  product: Product;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryProductArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
  createProduct: Product;
  updateProduct: Product;
  deleteProduct: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInputs;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationCreateProductArgs = {
  data: CreateProductInputs;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
  id: Scalars['Float'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};

export type CreateUserInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateProductInputs = {
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type UpdateProductInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name'>
  )> }
);

export type MainQueryVariables = Exact<{ [key: string]: never; }>;


export type MainQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name'>
  )> }
);


export const ProductsDocument = gql`
    query PRODUCTS {
  products {
    id
    name
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = ApolloReactCommon.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const MainDocument = gql`
    query Main {
  products {
    id
    name
  }
}
    `;

/**
 * __useMainQuery__
 *
 * To run a query within a React component, call `useMainQuery` and pass it any options that fit your needs.
 * When your component renders, `useMainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMainQuery({
 *   variables: {
 *   },
 * });
 */
export function useMainQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MainQuery, MainQueryVariables>) {
        return ApolloReactHooks.useQuery<MainQuery, MainQueryVariables>(MainDocument, baseOptions);
      }
export function useMainLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MainQuery, MainQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MainQuery, MainQueryVariables>(MainDocument, baseOptions);
        }
export type MainQueryHookResult = ReturnType<typeof useMainQuery>;
export type MainLazyQueryHookResult = ReturnType<typeof useMainLazyQuery>;
export type MainQueryResult = ApolloReactCommon.QueryResult<MainQuery, MainQueryVariables>;