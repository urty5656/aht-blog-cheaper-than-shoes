import { firestoreErrorToHTTP } from '@/lib/firebase/firestore';
import { CommonError, error } from '@/models/Common/error';
import { AppProps } from '@/pages/_app';
import { defaultTo } from 'fp-ts-ramda';
import { pipe } from 'fp-ts/lib/pipeable';
import { task, Task } from 'fp-ts/lib/Task';
import { bimap, getOrElse, mapLeft, TaskEither } from 'fp-ts/lib/TaskEither';
import { NextComponentType, NextPageContext } from 'next';
import React from 'react';

export type TaskIP<P> = TaskEither<CommonError, P>;

export type TaskFC<P = object> = NextComponentType<
  NextPageContext,
  TaskIP<P>,
  P
>;

export type WrappedTaskFC<P = {}> = NextComponentType<
  NextPageContext,
  Task<AppProps>,
  P
>;

export const withTaskHandler = <T extends any>(Page: TaskFC<T>) => {
  const wrapped: WrappedTaskFC<T> = props => {
    return <Page {...props} />;
  };

  wrapped.getInitialProps = async ctx => {
    if (!Page.getInitialProps) {
      return task.of({ statusCode: 200, pageProps: null });
    }

    const pageProps = (await Page.getInitialProps(ctx)) as TaskEither<
      CommonError | undefined,
      any
    >;

    const makeAppProps = pipe(
      pageProps,
      mapLeft(defaultTo(error('unknown'))),
      bimap(
        // failure - no page props required
        error => ({
          pageProps: null,
          statusCode: firestoreErrorToHTTP(error.code),
        }),
        // success - forced 200
        pageProps => ({
          pageProps,
          statusCode: 200,
        }),
      ),
      getOrElse(e => {
        ctx.res && (ctx.res.statusCode = e.statusCode);
        return task.of(e);
      }),
    );

    return makeAppProps;
  };

  return wrapped;
};
