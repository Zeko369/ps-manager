import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const uri = 'http://localhost:4000/graphql';

export default function createApolloClient(initialState, ctx) {
  const fetchClient = (input, options) => {
    if (ctx) {
      return fetch(input, {
        ...options,
        headers: { ...options.headers, cookie: ctx.req.headers['cookie'] }
      });
    }

    return fetch(input, options);
  };

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri,
      credentials: 'include',
      fetch: fetchClient
    }),
    cache: new InMemoryCache().restore(initialState)
  });
}
