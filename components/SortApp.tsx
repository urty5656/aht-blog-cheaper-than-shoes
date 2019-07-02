import { NextContext, NextFC } from 'next';

export type PageFC<P> = NextFC<
  P,
  void | P | { statusCode?: number },
  NextContext
>;
