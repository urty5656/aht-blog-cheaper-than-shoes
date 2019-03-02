import { useStaticRendering } from 'mobx-react-lite';
import App, { Container } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import '../styles/normalize.css';

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
        <Header />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
