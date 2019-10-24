import { TaskEither } from 'fp-ts/lib/TaskEither';
import { NextComponentType, NextPageContext } from 'next';

// Left with null is same as { statusCode: 500 }
export type PageIP<P> = TaskEither<null | { statusCode: number }, P>;

export type PageFC<P = object> = NextComponentType<
  NextPageContext,
  PageIP<P>,
  P
>;
