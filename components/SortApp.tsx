import { NextComponentType, NextPageContext } from 'next';

export type PageIP<P> = void | P | { statusCode?: number };

export type PageFC<P = object> = NextComponentType<
  NextPageContext,
  PageIP<P>,
  P
>;
