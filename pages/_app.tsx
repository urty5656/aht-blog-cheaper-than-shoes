import Error from '@/components/common/Error';
import Sidebar from '@/components/common/Sidebar';
import { WrappedTaskFC } from '@/components/common/withTaskHandler';
import '@/styles/normalize.scss';
import styles from '@/styles/pages/app.scss';
import { useStaticRendering } from 'mobx-react-lite';
import NextApp, { AppContext } from 'next/app';
import NProgress from 'nprogress';
import React from 'react';

export interface AppProps {
  statusCode: number;
  pageProps: any;
}
interface AppStates {
  isLoading: boolean;
}

if (!process.browser) {
  useStaticRendering(true);
}

class App extends NextApp<AppProps, AppStates> {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    NProgress.configure({ minimum: 0.75, showSpinner: false, speed: 375 });
    const startLoading = () => {
      NProgress.start();
      this.setState({ isLoading: true });
    };
    const endLoading = () => {
      NProgress.done();
      this.setState({ isLoading: false });
    };

    const { router } = this.props;
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', endLoading);
    router.events.on('routeChangeError', endLoading);
  }

  render() {
    const { Component, statusCode, pageProps } = this.props;
    const { isLoading } = this.state;

    return (
      <>
        <div id="__app" className={isLoading ? styles.appLoading : styles.app}>
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

    const page: WrappedTaskFC = Component;

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
