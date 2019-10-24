import Error from '@/components/common/Error';
import Sidebar from '@/components/common/Sidebar';
import { PageFC } from '@/components/SortApp';
import '@/styles/normalize.scss';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { bimap, TaskEither } from 'fp-ts/lib/TaskEither';
import { useStaticRendering } from 'mobx-react-lite';
import NextApp, { AppContext } from 'next/app';
import NProgress from 'nprogress';
import React from 'react';

if (!process.browser) {
  useStaticRendering(true);
}

export interface AppProps {
  statusCode: number;
  pageProps: any;
}

class App extends NextApp<AppProps> {
  componentDidMount() {
    NProgress.configure({ minimum: 0.33, showSpinner: false, speed: 375 });
    const startLoading = () => {
      NProgress.start();
    };
    const endLoading = () => {
      NProgress.done();
    };

    const { router } = this.props;
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', endLoading);
    router.events.on('routeChangeError', endLoading);
  }

  render() {
    const { Component, statusCode, pageProps } = this.props;

    return (
      <>
        <div id="__app">
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
    const { ctx } = actx;
    const page = actx.Component as PageFC<any>;

    if (!page.getInitialProps) {
      return { statusCode: 200, pageProps: null };
    }

    // try extra protection
    try {
      const pageProps = page.getInitialProps(ctx) as TaskEither<
        { statusCode: number } | null,
        any
      >;

      const appProps = await pipe(
        pageProps,
        bimap(
          // failure - no page props required
          error => ({
            pageProps: null,
            statusCode: error ? error.statusCode : 500,
          }),
          // success - forced 200
          pageProps => ({
            pageProps,
            statusCode: 200,
          }),
        ),
      )();

      return fold<AppProps, AppProps, AppProps>(
        e => {
          // [todo] IO
          ctx.res && (ctx.res.statusCode = e.statusCode);
          return e;
        },
        r => r,
      )(appProps);
    } catch (e) {
      console.error(e);
      ctx.res && (ctx.res.statusCode = 500);

      return { statusCode: 500, pageProps: null };
    }
  }
}

export default App;
