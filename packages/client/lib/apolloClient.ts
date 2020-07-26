import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const uri = 'http://localhost:4000/graphql';

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri,
      credentials: 'same-origin',
      fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  });
}
