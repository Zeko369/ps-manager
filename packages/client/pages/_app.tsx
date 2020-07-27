import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { withApollo } from '../lib/apollo';
import ChakraWrapper from '../lib/chakra';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Circuitmess Pledge / Subscription manager</title>
      </Head>
      <ChakraWrapper>
        <Component {...pageProps} />
      </ChakraWrapper>
    </>
  );
};

export default withApollo({ ssr: true })(App);
