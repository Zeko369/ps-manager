import React from 'react';
import { AppProps } from 'next/app';

import { withApollo } from '../lib/apollo';
import ChakraWrapper from '../lib/chakra';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraWrapper>
      <Component {...pageProps} />
    </ChakraWrapper>
  );
};

export default withApollo({ ssr: true })(App);
