import { T, TE, pipe } from '@/prelude';
import { firestoreErrorToHTTP } from '@/lib/firebase/firestore';
import { CommonError, error } from '@/models/Common/error';
import { AppProps } from '@/pages/_app';
import { defaultTo } from 'fp-ts-ramda';
import { NextComponentType, NextPageContext } from 'next';
import React from 'react';

export type TaskIP<P> = TE.TaskEither<CommonError, P>;

export type TaskFC<P = object> = NextComponentType<
  NextPageContext,
  TaskIP<P>,
  P
>;

export type WrappedTaskFC<P = {}> = NextComponentType<
  NextPageContext,
  T.Task<AppProps>,
  P
>;

export const withTaskHandler = <T extends any>(
  Page: TaskFC<T>,
): WrappedTaskFC<T> => {
  const wrapped: WrappedTaskFC<T> = props => {
    return <Page {...props} />;
  };

  wrapped.getInitialProps = async ctx => {
    if (!Page.getInitialProps) {
      return T.task.of({ statusCode: 200, pageProps: null });
    }

    const pageProps = (await Page.getInitialProps(ctx)) as TE.TaskEither<
      CommonError | undefined,
      any
    >;

    const makeAppProps = pipe(
      pageProps,
      TE.mapLeft(defaultTo(error('unknown'))),
      TE.bimap(
        // failure - no page props required
        left => ({
          pageProps: null,
          statusCode: firestoreErrorToHTTP(left.code),
        }),
        // success - forced 200
        right => ({
          pageProps: right,
          statusCode: 200,
        }),
      ),
      TE.getOrElse(e => {
        ctx.res && (ctx.res.statusCode = e.statusCode);
        return T.task.of(e);
      }),
    );

    return makeAppProps;
  };

  return wrapped;
};
