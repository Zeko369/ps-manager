import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { AppProps as BaseAppProps } from 'next/app';

import { withApollo } from '../lib/apollo';

interface AppProps extends BaseAppProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

const App: React.FC<AppProps> = ({ Component, pageProps, apollo }) => {
  return (
    <div>
      <h1>Hello</h1>
      <Component {...pageProps} />
    </div>
  );
};

export default withApollo({ ssr: true })(App);
