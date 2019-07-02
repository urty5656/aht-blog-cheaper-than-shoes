import '@/styles/normalize.scss';
import { useStaticRendering } from 'mobx-react-lite';
import NextApp, { Container, NextAppContext } from 'next/app';
import dynamic from 'next/dynamic';
import React from 'react';
import Error from '../components/common/Error';

const Cursor = dynamic(() => import('@/components/common/Cursor'), {
  ssr: false,
  loading: () => null,
});

if (!process.browser) {
  useStaticRendering(true);
}

export interface AppProps {
  statusCode: number;
  pageProps: any;
}

class App extends NextApp<AppProps> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    const { res } = ctx;

    if (Component.getInitialProps) {
      try {
        const initialProps = (await Component.getInitialProps(ctx)) || {};
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
      <Container>
        <Cursor />
        {statusCode === 200 ? (
          <Component {...pageProps} />
        ) : (
          <Error statusCode={statusCode} />
        )}
      </Container>
    );
  }
}

export default App;
