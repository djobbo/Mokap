import Head from 'next/head';

import type { AppProps } from 'next/app';
import { ReactElement } from 'react';

function _App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default _App;
