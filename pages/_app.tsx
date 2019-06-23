import '@/styles/normalize.scss';
import { useStaticRendering } from 'mobx-react-lite';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';
import React from 'react';

const Cursor = dynamic(() => import('@/Components/Common/Cursor'), {
  ssr: false,
  loading: () => null,
});

if (!process.browser) {
  useStaticRendering(true);
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Cursor />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
