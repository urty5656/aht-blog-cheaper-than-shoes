import '@/styles/normalize.scss';

import Error from '@/components/common/Error';
import Sidebar from '@/components/common/Sidebar';
import { WrappedTaskFC } from '@/components/common/withTaskHandler';
import styles from '@/styles/pages/app.scss';

import NextApp, { AppContext } from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import React from 'react';

export interface AppProps {
  statusCode: number;
  pageProps: any;
}
interface AppStates {
  isLoading: boolean;
}

class App extends NextApp<AppProps, AppStates> {
  state = {
    isLoading: false,
  };

  componentDidMount(): void {
    NProgress.configure({ minimum: 0.75, showSpinner: false, speed: 375 });
    const startLoading = (): void => {
      NProgress.start();
      this.setState({ isLoading: true });
    };
    const endLoading = (): void => {
      NProgress.done();
      this.setState({ isLoading: false });
    };

    const { router } = this.props;
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', endLoading);
    router.events.on('routeChangeError', endLoading);
  }

  render(): JSX.Element {
    const { Component, statusCode, pageProps } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        <div id="__app" className={isLoading ? styles.appLoading : styles.app}>
          <Head>
            <title>NOT 整列</title>
          </Head>
          {statusCode === 200 ? (
            <Component {...pageProps} />
          ) : (
            <Error statusCode={statusCode} />
          )}
        </div>
        <Sidebar />
      </>
    );
  }

  static async getInitialProps(actx: AppContext): Promise<AppProps> {
    const { ctx, Component } = actx;

    if (!Component.getInitialProps) {
      return { statusCode: 200, pageProps: null };
    }

    const page = Component as WrappedTaskFC;

    try {
      return (await page.getInitialProps!(ctx))();
    } catch (e) {
      console.error('App error', e);
      ctx.res && (ctx.res.statusCode = 500);

      return { statusCode: 500, pageProps: null };
    }
  }
}

export default App;
