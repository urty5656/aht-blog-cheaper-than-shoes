import { PageFC } from '@/components/SortApp';
import '@/styles/normalize.scss';
import { useStaticRendering } from 'mobx-react-lite';
import NextApp, { AppContext } from 'next/app';
import React from 'react';
import Error from '../components/common/Error';

if (!process.browser) {
  useStaticRendering(true);
}

export interface AppProps {
  statusCode: number;
  pageProps: any;
}

class App extends NextApp<AppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { res } = ctx;

    if ((Component as PageFC<any>).getInitialProps) {
      try {
        const initialProps =
          (await (Component as PageFC<any>).getInitialProps!(ctx)) || {};
        const { statusCode: initStatusCode, ...pageProps } = initialProps;

        const statusCode = initStatusCode || 200;
        res && (res.statusCode = statusCode);

        return {
          statusCode,
          pageProps,
        };
      } catch (e) {
        console.error(e);
        res && (res.statusCode = 500);
        return { statusCode: 500, pageProps: null };
      }
    }

    return { statusCode: 200, pageProps: null };
  }

  render() {
    const { Component, statusCode, pageProps } = this.props;

    return (
      <>
        {/* <Cursor /> */}
        {statusCode === 200 ? (
          <Component {...pageProps} />
        ) : (
          <Error statusCode={statusCode} />
        )}
      </>
    );
  }
}

export default App;
